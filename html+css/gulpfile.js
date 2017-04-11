const gulp = require('gulp');
var stylus = require('gulp-stylus');

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('src/images/*.*')
    .pipe(gulp.dest('dist/images'));
  gulp.src('src/fonts/*.*')
    .pipe(gulp.dest('dist/fonts'));
});

gulp.task('css', function() {
  return gulp.src('src/css/main.styl')
    .pipe(stylus({
      compress: true
    }))
    .pipe(gulp.dest('dist/css'));
});

gulp.task('default', ['css', 'copy'], function() {
  return gulp.watch('src/**/*.*', ['css', 'copy']);
});
