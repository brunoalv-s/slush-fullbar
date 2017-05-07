'use strict';

var gulp = require('gulp'),
    sass = require('gulp-sass'),
    browserSync = require('browser-sync'),
    gutil = require('gulp-util'),
    plumber = require('gulp-plumber'),
    uglify = require('gulp-uglify'),
    concat = require('gulp-concat'),
    cleanCss = require('gulp-clean-css'),
    prefix = require('gulp-autoprefixer'),
    rename = require('gulp-rename'),
    sourcemaps = require('gulp-sourcemaps'),

    path = {
        styles: {
            main: 'assets/sass/main.{sass,scss}',
            all: 'assets/sass/**/*.{sass,scss}',
            dest: 'assets/css/'
        },
        scripts: {
            main: 'assets/js/main.js',
            all: ['assets/js/vendors/**/*.js','assets/js/main.js'],
            dest: 'assets/js/'
        },
        images: {
            all: 'assets/images/**/*',
            dest: 'assets/img/'
        }
    };

gulp.task('sass', function() {
    gulp.src(path.styles.main)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(prefix('last 2 versions', 'safari 5', 'ie6', 'ie7', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(rename({
            suffix: '.min'
        }))
        .pipe(cleanCss())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.styles.dest))
});

gulp.task('js', function() {
    gulp.src(path.scripts.all)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.scripts.dest))
        .pipe(browserSync.reload({ stream: true }));
});