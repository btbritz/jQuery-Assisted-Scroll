module.exports = function(grunt) {

  var packageBanner = '/*! <%= pkg.name.split("-").join(" ") %> v<%= pkg.version %> | Copyright (c) <%= new Date().getFullYear() %> <%= pkg.author.name %> | See LICENSE */\n';

  // Project configuration.
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    uglify: {
      options: {
        report: 'min',
        banner: packageBanner
      },
      build: {
        src: 'src/jquery.assistedscroll.js',
        dest: 'dist/jquery.assistedscroll.min.js'
      }
    },
    watch: {
      scripts: {
        files: 'src/**/*.js',
        tasks: 'js',
        options: {
          spawn: false
        }
      }
    },
    jshint: {
      files: 'src/jquery.assistedscroll.js',
      options: {
        // Ignore library files, because they never lint
        ignores: ['js/lib/*.js']
      }
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task(s).
  grunt.registerTask('js', ['jshint', 'uglify']);
  grunt.registerTask('default', ['jshint', 'uglify']);

};
