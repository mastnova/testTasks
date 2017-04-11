const gulp = require('gulp');
const babel = require('gulp-babel');
const browserify = require("browserify");
const source = require('vinyl-source-stream');

gulp.task('copy', function() {
  gulp.src('src/index.html')
    .pipe(gulp.dest('dist'));
  gulp.src('src/css/*.*')
    .pipe(gulp.dest('dist/css'));
});

  gulp.task('browserify', function() {
  browserify('./src/index.js')
    .transform("babelify", {presets: ["es2015", "react"]})
    .bundle()
    .pipe(source('index.js'))
    .pipe(gulp.dest('dist'))
});

  gulp.task('default', ['browserify', 'copy'], function() {
  return gulp.watch('src/**/*.*', ['browserify', 'copy']);
});
