/*global module:false*/
module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    regarde: {
      app: {
        files: ['lib/**/*.js', 'models/**/*.js', 'test/**/*.js'],
        tasks: ['exec']
      }
    },
    exec: {
      test: {
        cmd: 'mocha --recursive --colors --growl --reporter min'
      }
    }
  });

  // Default task.
  grunt.registerTask('default', 'regarde');

  // Load Dependencies
  grunt.loadNpmTasks('grunt-regarde');
  grunt.loadNpmTasks('grunt-contrib-watch');
  grunt.loadNpmTasks('grunt-exec');

};
