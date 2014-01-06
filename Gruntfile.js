module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    settings: {
    },
    pkg: grunt.file.readJSON('package.json'),
    jshint: {
      all: [
        'Gruntfile.js',
        'app.js',
        'routes/*.js',
        'models/*.js'
      ] // add in server-side js here 'public/js/*.js', 'public/js/lib/*.js', 'public/js/controllers/*.js'
    },
    concat: {
      dist: {
        src: [
          'public/js/vendor/jquery/jquery-2.0.3.js',
          'public/js/vendor/angular/angular.js',
          'public/js/vendor/angular/angular-ui-router.js',
          // 'public/js/vendor/bootstrap/bootstrap.js',
          'public/js/lib/*.js',
          'public/js/*.js',
          'public/js/controllers/*.js'
        ],
        dest: 'public/js/production/all.js'
      }
    },
    uglify: {
      dist: {
        src: ['public/js/production/all.js'],
        dest: 'public/js/production/all.min.js'
      }
    },
    sass: {
      dist: {
        files: {
          'public/css/app.css': ['public/css/app.scss']
        }
      }
    },
    watch: {
      files: [
        'public/css/app.scss',
        'public/js/*.js',
        'public/js/controllers/*.js',
        'public/js/lib/*.js',
        'routes/*.js'
      ],
      tasks: ['sass','jshint','concat']
    }
  });

  // Default task.
  grunt.registerTask('default', ['sass','jshint','concat','uglify']);
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-contrib-sass');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-uglify');
};
