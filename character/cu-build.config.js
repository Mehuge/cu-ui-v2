/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var projectName = 'character';

module.exports = {
  type: 'module',
  path: __dirname,
  name: projectName,
  globs: {
    ts: [ './src/ts/**/*.ts', './src/ts/**/*.tsx' ],
    styl: [ './src/**/*.styl' ],
    html: [ './src/**/*.html' ],
    images: [ './src/**/*.png' ],
    resources: [
      { src: './node_modules/cu-components/lib/classes/unitframe.css', 
        dest: '../lib/cu-components' },
      { src: './node_modules/cu-components/lib/classes/unitframe/images/*.png', 
        dest: '../lib/cu-components/unitframe/images' },
      { src: './node_modules/cu-components/lib/classes/unitframe/images/portraits/*.jpg', 
        dest: '../lib/cu-components/unitframe/images/portraits' }
    ]
  },
  publish: {
    jsOutput: '../dist/character',
  },
};
