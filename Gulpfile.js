'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass');

gulp.task('styles', function() {
  return gulp.src('./public/src/scss/*.scss')
    .pipe(sass({outputStyle: 'expanded'}))
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('styles:watch', function() {
  gulp.watch('./public/src/scss/*.scss', ['styles']);
});

gulp.task('default', ['styles:watch'], function() {});
