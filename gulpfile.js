(function() {

  'use strict';

  // Include Gulp & tools
  var gulp = require('gulp'),
      sass         = require('gulp-sass'),
      minifycss    = require('gulp-minify-css'),
      autoprefixer = require('gulp-autoprefixer'),
      runSequence  = require('run-sequence'),
      rename       = require('gulp-rename'),
      plumber      = require('gulp-plumber'),
      gutil        = require('gulp-util');

  var onError = function( err ) {
    console.log('An error occurred:', gutil.colors.magenta(err.message));
    gutil.beep();
    this.emit('end');
  };

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

  // Default
  gulp.task('default', ['watch'], function() {
    gulp.start('build');
  });

})();