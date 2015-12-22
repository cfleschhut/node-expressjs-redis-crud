'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css');

gulp.task('styles', function() {
  return gulp.src('./public/src/scss/*.scss')
    .pipe(sass())
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('styles:watch', function() {
  gulp.watch('./public/src/scss/*.scss', ['styles']);
});

gulp.task('default', ['styles:watch'], function() {});
