'use strict';

var gulp        = require('gulp-help')(require('gulp')),
    sass        = require('gulp-sass'),
    browserSync = require('browser-sync'),
    plumber     = require('gulp-plumber'),
    uglify      = require('gulp-uglify'),
    concat      = require('gulp-concat'),
    cleanCss    = require('gulp-clean-css'),
    prefix      = require('gulp-autoprefixer'),
    rename      = require('gulp-rename'),
    sourcemaps  = require('gulp-sourcemaps'),

    // Caminhos padrão de projeto
    // Exemplo de uso: path.scripts.main => 'assets/js/main.js'
    // TESTE <%= appName %>
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

gulp.task('sass', 'Compila os arquivos SASS, adiciona sourcemaps, autoprefixer e minifica o css', function() {
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
        .pipe(browserSync.reload({ stream: true }));
});

gulp.task('js', 'Concatena e minifica os arquivos JavaScript', function() {
    gulp.src(path.scripts.all)
        .pipe(plumber())
        .pipe(sourcemaps.init())
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(path.scripts.dest))
        .pipe(browserSync.reload({ stream: true }));
});

// Abre o browser-sync apenas para testes e visualização em outros dispositivos
// Geralmente para a visualização do GP.
gulp.task('homologa', 'Servidor de "Homologação" local', function() {
    browserSync.init({
        open: false,
        server: './',

        ghostMode: {
            scroll: false,
            forms: false,
            clicks: false
        }
    });
});

// Inicia o Browser-Sync para o desenvolvimento. (Comportamento padrão)
gulp.task('dev', 'Servidor de Desenvolvimento com Browser-Sync', function() {
    browserSync.init({
        server: './'
    });

    gulp.watch(path.styles.all, ['sass']);
    gulp.watch(path.scripts.all, ['js']);
    gulp.watch('./*.html').on('change', browserSync.reload);
});

// Compila todos os arquivos SASS e Js do projeto.
gulp.task('build', 'Compila todos os arquivos SASS e js do projeto', ['sass', 'js']);

// Tarefa padrão de desenvolvimento.
gulp.task('default', 'Compila todos os arquivos SASS e JS e logo após sobe o ambiente de desenvolvimento', ['build', 'dev']);