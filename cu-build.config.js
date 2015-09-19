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
    dest:  __dirname + '/publish',
  },
  build: {
    install_npm: false, // if npm should be installed during install task
    install_tsd: true, // if tsd should be installed during install task
    ui_nested: false,
  },
  server: {
    inject: {
    	scripts_before: [
    		"./lib/cu-fake-api/src/main.js"
    	]
  	}
  }
};
