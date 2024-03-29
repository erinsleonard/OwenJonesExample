var gulp = require('gulp');
var sass = require('gulp-sass');
var watch = require('gulp-watch');
var concat = require('gulp-concat');
var livereload = require('gulp-livereload');

var bootstrapDir = './node_modules/bootstrap-sass/assets';
var flickityDir = './node_modules/flickity/dist';
var stickyDir = './node_modules/stickyfilljs/dist';  // add stickyfilljs

gulp.task('sass', function() {
  return gulp.src('css/style.scss')
            .pipe(sass({
              includePaths: [
                bootstrapDir + '/stylesheets',
                flickityDir
              ]
            }).on('error', sass.logError))
            .pipe(gulp.dest('./css/'))
            .pipe(livereload());
});

gulp.task('templates', function() {
  livereload.reload();
});

var bootstrapJsDir = bootstrapDir + '/javascripts/bootstrap';
var jsFiles = [
  flickityDir + '/flickity.pkgd.min.js',
  stickyDir + '/stickyfill.min.js',
  './js/menu.js',
  './js/gallery.js',
  './js/surfaces-partner-form.js',
  bootstrapJsDir + '/modal.js',
  bootstrapJsDir + '/dropdown.js',
  './js/video-overlay.js',
  './js/partner-portal.js',

];
gulp.task('js', function() {
  return gulp.src(jsFiles)
          .pipe(concat('scripts-all.js'))
          .pipe(gulp.dest('./js/'))
          .pipe(livereload());
});

gulp.task('watch', function() {
  livereload.listen();
  gulp.watch('css/**/*.scss', ['sass']);
  gulp.watch('../../**/*.html', ['templates']);
  gulp.watch(jsFiles, ['js']);
});

gulp.task('default', ['watch']);
