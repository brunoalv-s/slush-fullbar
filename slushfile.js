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
    inquirer = require('inquirer');

gulp.task('default', function(done) {

  var options = {
    templatesDir: __dirname + '/templates',
  };

  var paths = {
    cssFramework: {
      bootstrap: 'sass/1-settings/vendor/bootstrap/**',
      bulma: 'sass/1-settings/vendor/bulma/**'
    }
  }

  // Lista de Perguntas
  var prompts = [{
      name: 'appName',
      message: 'Qual o nome do Projeto?',
      default: 'Projeto Fullbar'
  }, {
      name: 'appDescription',
      message: 'Qual a descrição do Projeto?',
      default: 'Novo projeto em desenvolvimento'
  }, {
      type: 'checkbox',
      name: 'cssFramework',
      message: 'Qual Framework CSS você vai usar?',
      choices: ['boostrap', 'foundation-sites', 'bulma', 'Nenhum'],
      default: 'Nenhum'
  }, {
      type: 'checkbox',
      name: 'templateEngine',
      message: 'Deseja utilizar algum Template Engine?',
      choices: ['jade/pug', 'Nenhum'],
      default: 'Nenhum'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continuar?'
  }];


  inquirer.prompt(prompts, function(answers) {
    if (!answers.moveon) {
      return done();
    }

    answers.projectNameSlug = _.slugify(answers.projectName);
    var d = new Date();
    answers.year = d.getFullYear();

    var files = [options.templatesDir + '/**'];
    if (answers.cssFramework === 'bootstrap') {
      files.push(
        '!' + options.templatesDir + 'caminho/foundation-sites',
        '!' + options.templatesDir + paths.cssFramework.bulma
      );
    } else if (answers.cssFramework === 'bulma') {
      files.push(
        '!' + options.templatesDir + paths.cssFramework.bootstrap,
        '!' + options.templatesDir + 'caminho/foundation-sites'
      );
    } else if (answers.cssFramework === 'foundation-sites') {
      files.push(
        '!' + options.templatesDir + paths.cssFramework.bootstrap,
        '!' + options.templatesDir + paths.cssFramework.bulma
      );
    } else {
      files.push(
        '!' + options.templatesDir + paths.cssFramework.bootstrap,
        '!' + options.templatesDir + paths.cssFramework.bulma,
        '!' + options.templatesDir + 'caminho/foundation-sites'
      );
    };
  });
    //Ask
    // inquirer.prompt(prompts,
    //     function(answers) {
    //         if (!answers.appName) {
    //             return done();
    //         }
    //         answers.appNameSlug = _.slugify(answers.appName)
    //         answers.appAuthorSlug = _.slugify(answers.appAuthor)
    //         gulp.src(__dirname + '/templates/**')
    //             .pipe(template(answers))
    //             .pipe(rename(function(file) {
    //                 if (file.basename[0] === '_') {
    //                     file.basename = '.' + file.basename.slice(1);
    //                 }
    //             }))
    //             .pipe(conflict('./'))
    //             .pipe(gulp.dest('./'))
    //             .pipe(install())
    //             .on('end', function() {
    //                 done();
    //             });
    //     });
});
