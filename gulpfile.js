var gulp = require('gulp'),
  uglify = require('gulp-uglify'),
  livereload = require('gulp-livereload'),
  concat = require('gulp-concat'),
  minifyCss = require('gulp-minify-css'),
  autoPrefixer = require('gulp-autoprefixer'),
  plumber = require('gulp-plumber'),
  sourcemaps = require('gulp-sourcemaps'),
  sass = require('gulp-sass'),
  babel = require('gulp-babel'),
  del = require('del'),
  zip = require('gulp-zip'),

// Handlebars plugins
  handlebars = require('gulp-handlebars'),
  handlebarsLib = require('handlebars'),
  declare = require('gulp-declare'),
  wrap = require('gulp-wrap'),

  // images plugins
  jpegoptim = require('imagemin-jpegoptim'),
  pngquant = require('imagemin-pngquant'),
  optipng = require('imagemin-optipng'),
  svgo = require('imagemin-svgo'),
  size = require('gulp-size'),

//File paths
  DIST_PATH = 'public/dist',
  SCRIPTS_PATH = 'public/scripts/**/*.js',
  SASS_PATH = 'public/scss/**/*.scss',
  TEMPLATES_PATH = 'templates/**/*.hbs',
  IMAGES_PATH = 'public/images/**/*.{png,jpg,jpeg,gif,svg}';

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
      .pipe(plumber(function (err) {
          console.log('Scripts Task Error');
          console.log(err);
          this.emit('end');
      }))
      .pipe(sourcemaps.init())
      .pipe(babel({
          presets: ['es2015']
      }))
      .pipe(uglify())
      .pipe(concat('scripts.js'))
      .pipe(sourcemaps.write())
      .pipe(gulp.dest(DIST_PATH))
      .pipe(livereload());
});

// Images
gulp.task('images', function () {
    console.log('starting images task');

    return gulp.src(IMAGES_PATH)
      .pipe(size({
          title: 'Uncompressed images'
      }))
      .pipe(pngquant({
          quality: '65-80'
      })())
      .pipe(optipng({
          optimizationLevel: 3
      })())
      .pipe(jpegoptim({
          max: 70
      })())
      .pipe(svgo()())
      .pipe(size({
          title: 'Compressed images'
      }))
      .pipe(gulp.dest(DIST_PATH + '/images'));
});

// Templates
gulp.task('templates', function () {
    return gulp.src(TEMPLATES_PATH)
      .pipe(handlebars({
          handlebars: handlebarsLib
      }))
      .pipe(wrap('Handlebars.template(<%= contents %>)'))
      .pipe(declare({
          namespace: 'templates',
          noRedeclare: true
      }))
      .pipe(concat('templates.js'))
      .pipe(gulp.dest(DIST_PATH))
      .pipe(livereload());
});

// Watch
gulp.task('watch', ['default'], function () {
    console.log('watch task launched');
    require('./server.js');
    livereload.listen();
    gulp.watch(SCRIPTS_PATH, ['scripts']);
    gulp.watch(SASS_PATH, ['styles']);
    gulp.watch(TEMPLATES_PATH, ['templates']);
});

// delete dist folder
gulp.task('clean', function() {
    console.log('remove dist folder launched');
    return del.sync([
      DIST_PATH
    ]);
});

//export zip
gulp.task('export', ['default'], function() {
   return gulp.src('public/**/*')
      .pipe(zip('website.zip'))
      .pipe(gulp.dest('./'));
});

gulp.task('default', ['clean', 'images', 'templates', 'styles', 'scripts'], function () {
    console.log('starting default task');
});