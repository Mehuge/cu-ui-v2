/**
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */

var gulp = require('gulp'),
  del = require('del'),
  ts = require('gulp-typescript'),
  typescript = require('typescript'),
  watch = require('gulp-watch'),
  rename = require('gulp-rename'),
  replace = require('gulp-replace'),
  sequence = require('gulp-sequence'),
  options = require('./cu-build.config'),
  stylus = require('gulp-stylus'),
  debug = require('gulp-debug');

var jsOutput;
if (options.publish) {
  jsOutput = options.publish.jsOutput;
}

if (jsOutput === undefined) {
  throw new Error("Please define publish.jsOutput in cu-build-config.js");
}

function compileTS() {
  var tsProject = ts.createProject('tsconfig.json', {
    typescript: typescript,
    declarationFiles: true,
  });
  console.log(options.globs.ts);
  gulp.src(options.globs.ts)
    .pipe(debug({ 'title': 'ts-compile:' }))
    .pipe(ts(tsProject))
    .pipe(gulp.dest(jsOutput))
    .pipe(debug({ 'title': 'output:' }));
}

function styles() {
  return gulp.src(options.globs.styl)
    .pipe(stylus({ set: ['compress', 'include css'] }))
    .pipe(debug({ 'title': 'source:' }))
    .pipe(rename(function (path) {
      // FIXME: Why do I need this hack?
      path.dirname = path.dirname.split('\\').slice(1).join('\\');
    }))
    .pipe(gulp.dest(jsOutput))
    .pipe(debug({ 'title': 'output:' }));
}

function images() {
  return gulp.src(options.globs.images)
    .pipe(rename(function (path) {
      // FIXME: Why do I need this hack?
      path.dirname = path.dirname.split('\\').slice(1).join('\\');
    }))
    .pipe(gulp.dest(jsOutput))
    .pipe(debug({ 'title': 'output:' }));
}

function build(cb) {
  sequence('images', 'styles', 'compileTS')(cb);
}

function watchBuild() {
  gulp.watch(options.glob.ts, build);
  return build();
}

function clean(cb) {

  del([jsOutput], { force: jsOutput.substr(0, 7) === '../dist' }, cb);
}

gulp.task('clean', clean);
gulp.task('styles', styles);
gulp.task('images', images);
gulp.task('compileTS', compileTS);
gulp.task('watch', ['clean'], watchBuild);
gulp.task('build', ['clean'], build);
gulp.task('default', [ 'build', 'clean']);
