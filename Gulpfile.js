'use strict';

var gulp = require('gulp'),
  sass = require('gulp-sass'),
  minifyCss = require('gulp-minify-css'),
  autoprefixer = require('gulp-autoprefixer');

gulp.task('styles', function() {
  return gulp.src('./public/src/scss/*.scss')
    .pipe(sass())
    .pipe(autoprefixer({
      browsers: ['last 2 versions']
    }))
    .pipe(minifyCss())
    .pipe(gulp.dest('./public/dist/css'));
});

gulp.task('styles:watch', function() {
  gulp.watch('./public/src/scss/*.scss', ['styles']);
});

gulp.task('default', ['styles:watch'], function() {});
