const gulp        = require('gulp'),
  concat      = require('gulp-concat'),
  del         = require('del'), // rm -rf
  uglify      = require('gulp-uglify'),
  nodemon     = require('gulp-nodemon'),
  sass        = require('gulp-sass');

gulp.task('delete', function() {
    return del(['dist']);
});

gulp.task('server', function () {
    nodemon({
      script: 'bin/www',
      watch: './',
      ext: 'js css hbs',
      env: { 'NODE_ENV': 'development' }
    });
});

gulp.task('sass-dev', function () {
    return gulp.src('./src/stylesheets/style.scss')
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(gulp.dest('./statics/default/stylesheets/'));
});

gulp.task('sass:watch', function () {
    gulp.watch('./src/stylesheets/**/*.scss', ['sass']);
});

gulp.task('js:watch', function () {
    gulp.watch('./src/js/*.js', ['bundleJs']);
});

gulp.task('bundleJs', ['delete'], function () {
    const localFiles  = './src/js/*',
      jQuery = './node_modules/jquery/dist/jquery.js';

    return gulp.src([jQuery, localFiles])
      .pipe(concat('tokenVesting.min.js'))
      .pipe(uglify())
      .pipe(gulp.dest('statics/default/js'));
});

gulp.task('copyImages', ['delete'], function() {
    return gulp.src('./src/img/*')
      .pipe(gulp.dest('statics/default/images'));
});


gulp.task('sass', function () {
    const css = ['./src/stylesheets/style.scss'];
    return gulp.src(css)
      .pipe(sass({outputStyle: 'compressed'}).on('error', sass.logError))
      .pipe(concat('style.css'))
      .pipe(gulp.dest('./statics/default/stylesheets/'));
});

gulp.task('build', ['delete', 'bundleJs', 'sass']);

gulp.task('default', ['build', 'server', 'sass:watch', 'js:watch']);