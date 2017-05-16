/*
 * slush-fullbar
 * https://github.com/seu-nome/slush-fullbar
 *
 * Copyright (c) 2014, Fullbar
 * Licensed under the MIT license.
 */

'use strict';

var gulp     = require('gulp'),
    conflict = require('gulp-conflict'),
    filter   = require('gulp-filter'),
    install  = require('gulp-install'),
    rename   = require('gulp-rename'),
    template = require('gulp-template'),
    gutil    = require('gulp-util'),
    inquirer = require('inquirer'),
    _        = require('underscore.string');

    var paths = {
      frameworkCSS: {
        bootstrap: '/assets/sass/1-settings/vendor/bootstrap/**',
        bulma: '/assets/sass/1-settings/vendor/bulma/**/*'
      },
      templateEngine: {
        pug: '/**/*.pug',
        html: '/**/*.html'
      }
    };

    var options = {
      templatesDir: __dirname + '/templates',
    };


gulp.task('default', function(done) {

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
      type: 'list',
      name: 'cssFramework',
      message: 'Qual Framework CSS você vai usar?',
      choices: ['boostrap', 'bulma', 'Nenhum'],
      default: 'Nenhum'
  }, {
      type: 'list',
      name: 'templateEngine',
      message: 'Deseja utilizar algum Template Engine?',
      choices: ['jade/pug', 'Nenhum'],
      default: 'Nenhum'
  }, {
    type: 'confirm',
    name: 'moveon',
    message: 'Continuar?'
  }];

  //Ask
  inquirer.prompt(prompts, function(answers) {
    if (!answers.appName) {
      return done();
    }

    answers.appNameSlug = _.slugify(answers.appName)
    answers.appDescriptionSlug = _.slugify(answers.appDescription)
    var files = [options.templatesDir + '/**'];
    if (answers.cssFramework === 'bootstrap') {
      files.push(
        '!' + options.templatesDir + paths.frameworkCSS.bulma
      );
    } else if (answers.cssFramework === 'bulma') {
      files.push(
        '!' + options.templatesDir + paths.frameworkCSS.bootstrap
      );
    } else if (answers.cssFramework === 'Nenhum') {
      files.push(
        '!' + options.templatesDir + paths.frameworkCSS.bootstrap,
        '!' + options.templatesDir + paths.frameworkCSS.bulma
      );
    };

    if (answers.templateEngine === 'Nenhum') {
      files.push(
        '!' + options.templatesDir + paths.templateEngine.pug
      )
    } else if (answers.templateEngine === 'jade/pug') {
      files.push(
        '!' + options.templatesDir + paths.templateEngine.html
      );
    };

    var filterImagesAndFonts = filter(['**/**', '!assets/fonts/**', '!assets/img/**'], {
      restore: true
    });

    gulp.src(files)
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
