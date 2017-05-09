/*
 * slush-goku
 * https://github.com/seu-nome/slush-goku
 *
 * Copyright (c) 2014, Seu Nome
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    install  = require('gulp-install'),
    conflict = require('gulp-conflict'),
    template = require('gulp-template'),
    rename   = require('gulp-rename'),
    _        = require('underscore.string'),
    inquirer = require('inquirer'),
    gutil    = require('gulp-util');

gulp.task('default', function(done) {

    gutil.log(
        gutil.colors.yellow('Bem-vindo ao gerador de Boilerplate da Fullbar')
    );

    // Lista de Perguntas
    var prompts = [{
        name: 'appName',
        message: 'Qual o nome do Projeto?',
        default: 'Projeto Fullbar'
    }, {
        name: 'appAuthor',
        message: 'Name of author?'
    }, {
        name: 'appDescription',
        message: 'Qual a descrição do Projeto?',
        default: 'Novo Projeto'
    }];

    //Ask
    inquirer.prompt(prompts,
        function(answers) {
            if (!answers.appName) {
                return done();
            }
            answers.appNameSlug = _.slugify(answers.appName)
            answers.appAuthorSlug = _.slugify(answers.appAuthor)
            gulp.src(__dirname + '/templates/**')
                .pipe(template(answers))
                .pipe(rename(function(file) {
                    if (file.basename[0] === '_') {
                        file.basename = '.' + file.basename.slice(1);
                    }
                }))
                .pipe(conflict('./'))
                .pipe(gulp.dest('./'))
                .pipe(install())
                .on('end', function() {
                    done();
                });
        });
});