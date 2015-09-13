/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

module.exports = {
  type: 'multi',
  path: __dirname,
  name: 'multi',
  publish: {
    dest: 'publish',
  },
  build: {
    ui_nested: false,
  },
  server: {
    inject: {
    	scripts_before: [
    		"node_modules/cu-fake-api/lib/main.js"
    	]
  	}
  }
};
