module.exports = function(grunt) {
    // require('load-grunt-tasks')(grunt);

    grunt.initConfig({
      pkg: grunt.file.readJSON("package.json"),

      clean: {
          all: {
              src: ['build']
          },
          old: {
              src: ['build/public/app.js']
          }
      },

      copy: {
          client: {
              files: [
                  {
                      expand: true,
                      cwd: 'public/',
                      src: ['**', '!**js/**', '!**stylesheets/**'],
                      dest: 'build/public',
                      filter: 'isFile',
                      flatten: false
                  }
              ]
          },
          vendor: {
              files: [
                  {
                      expand: true,
                      src: ['public/javascripts/vendor/*'],
                      dest: 'build/public/javascripts/vendor/',
                      filter: 'isFile',
                      flatten: true
                  }
              ]
          },
          server: {
              files: [
                  {
                      expand: true,
                      src: ['**', '!public/**', '!Gruntfile.js', '!**nbproject/**', '!access.log', '!files/**/*'], 
                      dest: 'build/',
                      filter: 'isFile'
                  }
              ]
          }
      },
      concat: {
          options: {
              separator: ';'
          },
          dist: {
              src: ['js/app.js'],
              dest: 'build/public/app.js'
          }
      },
      uglify: {
          options: {
              banner: '/*! <%= pkg.name %> Version : <%= pkg.version %> \n * Build date: <%= grunt.template.today("dd-mm-yyyy") %>\n */\n',
          },
          dist: {
              files: [
                  {
                      'build/public/app.min.js': ['build/public/app.js']
                  }
              ]
          }
      },
    });

    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-cssmin');
    grunt.loadNpmTasks('grunt-contrib-uglify');

    grunt.registerTask('default', ['clean','concat','uglify']);
};