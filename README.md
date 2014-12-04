# grunt-fontastic

> Update local version of Fontastic.me font.

## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-fontastic --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-fontastic');
```

## The "fontastic" task

### Overview
In your project's Gruntfile, add a section named `fontastic` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  fontastic: {
    dist: {
      options: {
        processor: 'scss', // Currently support only scss && css :{
        base64: 'true', // Do you want to create woff base64 css file?
        key: '*****', // Fontastic User id
        stylesFile: './path/to/style.scss', // File where icon classes located. Use(// Fontastic) to separate them from other styles.
        base64File: './path/to/style.css' // File with font-face in base64
      }
    }
  },
});
```

### Options

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
