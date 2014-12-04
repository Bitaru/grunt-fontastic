'use strict';

var Parser = (function(){
  this.data = {};
  this.fontNameRegepx = /font\-family:\s(?:["'])(\w+)["'];/;
  this.userIdRegepx = /src.*\/(\d{10}).eot"/;
  this.stylesRegepx = /(\n\..(\r|\n|.)+)/;

  return this.parse(arguments);
});

Parser.prototype.parse = function(content){
  var str = content[0];
  this.data = {
    font: str.match(this.fontNameRegepx)[1],
    user: str.match(this.userIdRegepx)[1],
    styles: str.match(this.stylesRegepx)[1]
  };
  return this.data;
};


module.exports = Parser;
