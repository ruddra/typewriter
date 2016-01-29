'use strict';

// Include Gulp & tools

var gulp         = require('gulp');
var watch        = require('gulp-watch');
var sass         = require('gulp-sass');
var minifycss    = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var runSequence  = require('run-sequence');
var concat       = require('gulp-concat');
var rename       = require('gulp-rename');
var plumber      = require('gulp-plumber');
var gutil        = require('gulp-util');

var onError = function( err ) {
  console.log('An error occurred:', gutil.colors.magenta(err.message));
  gutil.beep();
  this.emit('end');
}

// SASS

gulp.task('sass', function () {
  return gulp.src('./assets/sass/*.scss')
  .pipe(plumber({ errorHandler: onError }))
  .pipe(sass())
  .pipe(autoprefixer())
  .pipe(rename({suffix: '.min'}))
  .pipe(minifycss())
  .pipe(gulp.dest('./assets/css'));
});

// Watch

gulp.task('watch', function() {
  gulp.watch('./assets/sass/**/*.scss', ['sass']);
});


// Build

gulp.task('build', [], function() {
  runSequence('sass');
});

// Gulp Default

gulp.task('default', ['watch'], function() {
  gulp.start('build');
});