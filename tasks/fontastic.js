/*
 * grunt-fontastic
 * https://github.com/bitaru/grunt-fontastic
 *
 * Copyright (c) 2014 bitaru
 * Licensed under the MIT license.
 */

'use strict';

var https   = require('https'),
    zlib    = require('zlib'),
    parser  = require('./lib/parser');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('fontastic', 'Update local version of Fontastic.me font', function() {

    var done = this.async(),
        start = Date.now(),
        ready = 0,

    // Merge task-specific and/or target-specific options with these defaults.
    options = this.options({
      hostname: 'fontastic.s3.amazonaws.com',
    }),

    getBase = (function(){return '/' + options.key + '/'})(),

    getStyle = (function(){return getBase + 'icons.css'})(),

    setReady = function(){
      ready++;
      if(ready === 2){
        grunt.log.writeln('Task complete in ' + (Date.now() - start) + 'ms');
        done()
      }
    },

    fetchData = function(fontId, callback){
      var buffer = [],
          connect = {
            hostname: options.hostname,
            port: 443,
            method: 'GET',
            path: !fontId ? getStyle : getBase + 'fonts/' + fontId + '.woff'
          };

      var req = https.request(connect, function(response){
        var res = response;
        if(res.headers['content-encoding'] === 'gzip'){
          res = zlib.createGunzip();
          response.pipe(res);
        }

        res
        .on('data', function (chunk) {
          buffer.push(chunk.toString())
        })
        .on('end', function () {
          return callback(buffer.join(""));
        })
        .on('error', function(e) {
          grunt.log.writeln(['Error on fetch' , !fontId ? 'Style' : 'Font',  data].join(''));
        })
      });

      req.end();
    },

    createCSS = function(font, data){
      var content =
        "@font-face{font-family:\""+font+"\";src:url(\"data:font/opentype;base64,"+new Buffer(data).toString('base64')+"\");";
      grunt.file.write(options.base64File, content)
      setReady();
    },

    makeFont = function(user, font){
      fetchData(user, function(data){
        createCSS(font, data);
      });
    },

    createStyles = function(styles){
      var oldStyles = grunt.file.read(options.stylesFile),
          regexp = /(?:.*fontastic((?:\r|\n|.)+))/i,
          newStyles = oldStyles.replace(regexp, '// FONTASTIC\n' + styles);
          grunt.file.write(options.stylesFile, newStyles);
          setReady();
    };

    fetchData(null, function(data){
      var parsedData = new parser(data);
      makeFont(parsedData.user, parsedData.font);
      createStyles(parsedData.styles);
    });



  });

};
