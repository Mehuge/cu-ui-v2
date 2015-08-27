/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

'use strict';

var gulp = require('gulp');
var debug = require('gulp-debug');
var buildConfig = require('./cu-build.config.js');
var buildTools = require('cu-build-tools');

gulp.task('resources', function() {
	console.log('running publish:after');
	gulp.src([ 
		'node_modules/cu-components/lib/**/*.png',
		'node_modules/cu-components/lib/**/*.jpg',
		'node_modules/cu-components/lib/**/*.css'
	])
	.pipe(debug('title', 'copy:'))
	.pipe(gulp.dest('../publish/lib/cu-components'));
});

// load build tool tasks and obtain processed build configuration
var config = buildTools.auto(gulp, buildConfig);
