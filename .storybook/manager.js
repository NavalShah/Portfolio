import { themes } from '@storybook/theming';
import { addons } from '@storybook/addons';

addons.setConfig({
  theme: {
    ...themes.dark,
    // brandImage: 'https://name.com/icon.svg',
    brandTitle: 'Naval Shah Components',
    brandUrl: '',
  },
});
