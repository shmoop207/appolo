

module.exports = function (grunt) {

    grunt.initConfig({

        mochaTest: {
            test: {
                options: {
                    reporter: 'spec'
                },
                src: ['test/unit/**/*.js']
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-test');

    grunt.registerTask('test', 'mochaTest');

    grunt.registerTask('default', 'mochaTest');

};
