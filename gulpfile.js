var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  autoPrefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
//File paths
  DIST_PATH = 'public/dist',
  SCRIPTS_PATH = 'public/scripts/**/*.js',
  SASS_PATH = 'public/scss/**/*.scss';

// Styles
gulp.task('styles', function () {
    console.log('starting styles task');
    return gulp.src('public/scss/styles.scss')
      .pipe(plumber(function (err) {
          console.log('Styles Task Error');
          console.log(err);
          this.emit('end');
      }))
      .pipe(sourcemaps.init())
      .pipe(autoPrefixer())
      .pipe(sass({
          outputStyle: 'compressed'
      }))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST_PATH))
      .pipe(livereload());
});

// Scripts
gulp.task('scripts', function () {
    console.log('starting scripts task');
    return gulp.src(SCRIPTS_PATH)
      .pipe(uglify())
      .pipe(gulp.dest(DIST_PATH))
      .pipe(livereload());
});

// Images
gulp.task('images', function () {
    console.log('starting images task');
});

// Watch
gulp.task('watch', function () {
    console.log('watch task launched');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(SASS_PATH, ['styles']);
});

gulp.task('default', function () {
    console.log('starting default task');
});