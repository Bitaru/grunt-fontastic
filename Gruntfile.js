/*
 * grunt-fontastic
 * https://github.com/bitaru/grunt-fontastic
 *
 * Copyright (c) 2014 bitaru
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        '<%= nodeunit.tests %>'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },

    // Before generating any new files, remove any previously-created files.
    clean: {
      tests: ['tmp']
    },

    // Configuration to be run (and then tested).
    fontastic: {
      dist: {
        options: {
          processor: 'scss', // Currently support only scss && css, because
          base64: 'true', // Do you want to create woff base64 css file?
          key: 'aTndqAsr2B3e5Am3N9eSzG', // User id
          stylesFile: './tmp/style.scss',
          base64File: './tmp/style.css'
        }
      }
    },

    // Unit tests.
    nodeunit: {
      tests: ['test/*_test.js']
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // Whenever the "test" task is run, first clean the "tmp" dir, then run this
  // plugin's task(s), then test the result.
  grunt.registerTask('test', ['clean', 'fontastic', 'nodeunit']);

  // By default, lint and run all tests.
  grunt.registerTask('default', ['fontastic']);

};
