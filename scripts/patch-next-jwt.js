const fs = require('fs');

// Next 12 bundles buffer-equal-constant-time inside jsonwebtoken. Node 25+
// removed SlowBuffer, but this bundle still reads its prototype at import time.
// Guard only those obsolete references; leave Buffer comparison and JWT
// signing/verification unchanged. Remove this patch after upgrading Next to a
// release that supports Node 26 without it.
const jwtPath = require.resolve('next/dist/compiled/jsonwebtoken');
const source = fs.readFileSync(jwtPath, 'utf8');
const marker = '// portfolio: guard removed SlowBuffer in Next JWT bundle';
const replacements = [
  [
    'n.prototype.equal=i.prototype.equal=function equal(e){return bufferEq(this,e)}',
    'n.prototype.equal=function equal(e){return bufferEq(this,e)};if(i){i.prototype.equal=n.prototype.equal}',
  ],
  ['var o=i.prototype.equal;', 'var o=i&&i.prototype.equal;'],
  [
    'n.prototype.equal=a;i.prototype.equal=o',
    'n.prototype.equal=a;if(i){i.prototype.equal=o}',
  ],
];

if (!source.includes(marker)) {
  let patched = source;
  for (const [before, after] of replacements) {
    if (patched.split(before).length !== 2) {
      throw new Error(
        'Next JWT bundle changed. Review scripts/patch-next-jwt.js before deploying.'
      );
    }
    patched = patched.replace(before, after);
  }
  fs.writeFileSync(jwtPath, `${patched}\n${marker}\n`);
  console.log('Applied Next JWT compatibility patch for Node 26.');
}
