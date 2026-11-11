const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const Module = require('node:module');
const { test } = require('node:test');
const { format } = require('node:util');
const { transformSync } = require('esbuild');
const { JSDOM } = require('jsdom');
const React = require('react');
const { renderToString } = require('react-dom/server');
const { hydrateRoot } = require('react-dom/client');
const { act } = require('react-dom/test-utils');

// Compile the actual source modules without adding a separate test bundler.
function loadSource(relativePath, mocks = {}) {
  const filename = path.resolve(__dirname, '..', relativePath);
  const compiled = new Module(filename, module);
  compiled.filename = filename;
  compiled.paths = Module._nodeModulePaths(path.dirname(filename));
  const originalRequire = compiled.require.bind(compiled);
  compiled.require = request => {
    if (Object.hasOwn(mocks, request)) return mocks[request];
    if (/\.woff2$/.test(request)) return request;
    return originalRequire(request);
  };
  compiled._compile(transformSync(fs.readFileSync(filename, 'utf8'), {
    loader: 'jsx', format: 'cjs', jsx: 'automatic',
  }).code, filename);
  return compiled.exports;
}

const { useLocalStorage } = loadSource('src/hooks/useLocalStorage.js');
const { useWindowSize } = loadSource('src/hooks/useWindowSize.js');
const { useHasMounted } = loadSource('src/hooks/useHasMounted.js');
const { initialState, reducer } = loadSource('src/layouts/App/reducer.js');
const styleUtils = loadSource('src/utils/style.js');
const themeTokens = loadSource('src/components/ThemeProvider/theme.js', {
  'utils/style': styleUtils,
});
const provider = loadSource('src/components/ThemeProvider/ThemeProvider.js', {
  hooks: { useHasMounted },
  'utils/style': styleUtils,
  './theme': themeTokens,
  './useTheme': { useTheme: () => React.useContext(provider.ThemeContext) },
  'next/head': { __esModule: true, default: () => null },
});

async function checkHydration(Component, setup, verify) {
  const html = renderToString(React.createElement(Component));
  const dom = new JSDOM(`<div id="root">${html}</div>`, { url: 'http://localhost' });
  const errors = [];
  const previousError = console.error;
  global.window = dom.window;
  global.document = dom.window.document;
  global.IS_REACT_ACT_ENVIRONMENT = true;
  console.error = (...args) => errors.push(format(...args));
  let root;
  try {
    setup?.(dom.window);
    const container = dom.window.document.getElementById('root');
    await act(async () => {
      root = hydrateRoot(container, React.createElement(Component), {
        onRecoverableError: error => errors.push(error.message),
      });
    });
    await verify(container, dom.window, html);
    assert.deepEqual(errors, [], 'Hydration and effects must not log errors');
  } finally {
    if (root) await act(async () => root.unmount());
    console.error = previousError;
    delete global.window;
    delete global.document;
    delete global.IS_REACT_ACT_ENVIRONMENT;
    dom.window.close();
  }
}

function ThemePreference() {
  const [storedTheme] = useLocalStorage('theme', 'dark');
  const [state, dispatch] = React.useReducer(reducer, initialState);
  React.useEffect(() => {
    dispatch({ type: 'setTheme', value: storedTheme === 'light' ? 'light' : 'dark' });
  }, [storedTheme]);
  return React.createElement(provider.ThemeProvider, { themeId: state.theme },
    React.createElement('button', {
      onClick: () => dispatch({ type: 'toggleTheme' }),
    }, state.theme)
  );
}

test('a stored value used directly in markup hydrates without a mismatch', async () => {
  function PreferenceLabel() {
    const [value] = useLocalStorage('theme', 'dark');
    return React.createElement('span', null, value);
  }
  await checkHydration(PreferenceLabel,
    window => window.localStorage.setItem('theme', '"light"'),
    (container, window, html) => {
      assert.match(html, />dark</);
      assert.equal(container.textContent, 'light');
    }
  );
});

test('saved light theme hydrates, survives reload, and can toggle', async () => {
  await checkHydration(ThemePreference,
    window => window.localStorage.setItem('theme', '"light"'),
    async (container, window, html) => {
      assert.match(html, />dark</);
      assert.equal(container.textContent, 'light');
      assert.equal(window.document.body.dataset.theme, 'light');
      assert.equal(window.localStorage.getItem('theme'), '"light"');
      await act(async () => container.querySelector('button').click());
      assert.equal(container.textContent, 'dark');
      assert.equal(window.localStorage.getItem('theme'), '"dark"');
    }
  );
});

test('malformed or unavailable theme storage does not break rendering', async () => {
  for (const setup of [
    window => window.localStorage.setItem('theme', '{invalid'),
    window => Object.defineProperty(window, 'localStorage', {
      get() { throw new Error('Storage blocked'); },
    }),
  ]) {
    await checkHydration(ThemePreference, setup, async (container, window) => {
      assert.equal(container.textContent, 'dark');
      await act(async () => container.querySelector('button').click());
      assert.equal(container.textContent, 'light');
      assert.equal(window.document.body.dataset.theme, 'light');
    });
  }
});

test('mobile viewport hydrates from desktop defaults and responds to resize', async () => {
  function ResponsiveLayout() {
    const { width, height } = useWindowSize();
    return React.createElement('div', null, `${width <= 696 ? 'mobile' : 'desktop'}:${width}x${height}`);
  }
  await checkHydration(ResponsiveLayout,
    window => { window.innerWidth = 390; window.innerHeight = 844; },
    async (container, window, html) => {
      assert.match(html, /desktop:1280x800/);
      assert.equal(container.textContent, 'mobile:390x844');
      await act(async () => {
        window.innerWidth = 1440;
        window.innerHeight = 900;
        window.dispatchEvent(new window.Event('resize'));
      });
      assert.equal(container.textContent, 'desktop:1440x900');
    }
  );
});

test('pre-hydration theme script tolerates invalid and blocked storage', () => {
  const source = fs.readFileSync(path.resolve(__dirname, '../src/pages/_document.page.js'), 'utf8');
  const bootstrap = source.match(/__html: `([\s\S]*?)`/)[1];
  for (const stored of ['"light"', '"dark"', '"unknown"', '{invalid', null, 'blocked']) {
    const dom = new JSDOM('<body data-theme="dark"></body>', {
      url: 'http://localhost', runScripts: 'outside-only',
    });
    if (stored === 'blocked') {
      Object.defineProperty(dom.window, 'localStorage', {
        get() { throw new Error('Storage blocked'); },
      });
    } else if (stored !== null) {
      dom.window.localStorage.setItem('theme', stored);
    }
    assert.doesNotThrow(() => dom.window.eval(bootstrap));
    assert.equal(dom.window.document.body.dataset.theme, stored === '"light"' ? 'light' : 'dark');
    dom.window.close();
  }
});
