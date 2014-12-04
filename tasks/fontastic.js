/*
* grunt-fontastic
* https://github.com/bitaru/grunt-fontastic
*
* Copyright (c) 2014 bitaru
* Licensed under the MIT license.
*/

'use strict';

var request = require('request'),
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
      var connect = {
        gzip: true,
        uri: 'https://'+options.hostname+(!fontId ? getStyle : getBase + 'fonts/' + fontId + '.woff'),
        headers: {
          'User-Agent' : 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_7_4) AppleWebKit/536.11 (KHTML, like Gecko) Chrome/20.0.1132.57 Safari/536.11'
        }
      };

      if(fontId){
        connect.encoding = 'binary';
      }
      request( connect, function ( err, res, content ) {
        if ( err ) {
          grunt.log.writeln(['Error on fetch' , !fontId ? 'Style' : 'Font',  err].join(''));
        }
        if ( res && res.statusCode === 200 ) {
          return callback(content);
        }
      });
    },

    createCSS = function(font, data){
      var content =
      "@font-face{font-family:\""+font+"\";src:url(\"data:font/opentype;base64,"+new Buffer(data, 'binary').toString('base64')+"\");";
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
