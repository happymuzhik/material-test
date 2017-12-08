const gulp = require('gulp');
const stylus = require('gulp-stylus');
const plumber = require('gulp-plumber');
const autoprefixer = require('autoprefixer-stylus');
const concat = require('gulp-concat');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');

const dev_css_dir = './src/';
const dev_js_dir = './src/';

const css_dir = './dst/assets/';
const css_src_dir = './dst/src/';
const js_dir = './dst/assets/';
const js_src_dir = './dst/src/';

gulp.task('stylus', function () {
    return gulp.src([dev_css_dir + '*/*.css', dev_css_dir + '*/*.styl'])
        .pipe(plumber())
        .pipe(stylus({
            compress: false,
            use: [autoprefixer()]
        }))
        .pipe(concat('hm-material-ui.css'))
        .pipe(gulp.dest(css_src_dir));
});

gulp.task('stylus-min', function () {
    return gulp.src(dev_css_dir + '*/*.styl')
        .pipe(plumber())
        .pipe(stylus({
            compress: false,
            use: [autoprefixer()]
        }))
        .pipe(concat('hm-material-ui-min.css'))
        .pipe(cleanCSS())
        .pipe(gulp.dest(css_dir));
});

gulp.task('jsconcat', function () {
    return gulp.src(dev_js_dir + '*/*.js')
        .pipe(plumber())
        .pipe(concat('hm-material-ui.js'))
        .pipe(gulp.dest(js_src_dir));
});

gulp.task('jsconcat-min', function () {
    return gulp.src(dev_js_dir + '*/*.js')
        .pipe(plumber())
        .pipe(concat('hm-material-ui-min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(js_dir));
});

gulp.task('watch', ['stylus', 'stylus-min', 'jsconcat', 'jsconcat-min'], function () {
    gulp.watch('./src/*/*.styl', ['stylus']);
    gulp.watch('./src/*/*.styl', ['stylus-min']);
    gulp.watch('./src/*/*.js', ['jsconcat']);
    gulp.watch('./src/*/*.js', ['jsconcat-min']);
});