module.exports = function(grunt) {

    var configs = '_js/globals/configs/production.js',
        i = 0,
        len = grunt.cli.tasks.length;

    //SET GLOBAL CONFIGS BASED ON ENVIROMENT OR TASK
    for (i; i < len; i++) {
        if (grunt.cli.tasks[i] === 'dev') {
            configs = '_js/globals/configs/development.js';
        }
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        browserify: {
            libs: {
                files: {
                    '_js/bundled/core-support.js': [configs, '_js/core-support.js']
                },
                options: {
                    transform: ['babelify']
                }
            }
        },
        uglify: {
            options: {
                mangle: true,
                compress: true,
                beautify: false
            },
            build: {
                files: [{
                    src: [
                        '_js/bundled/core-support.js'
                    ],
                    dest: 'e2/js/rv7/core-support/<%= pkg.name %>.min.js'
                }]
            }
        },
        usebanner: {
            dist: {
                options: {
                    position: 'top',
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd h:MM:ss TT") %> */\n'
                },
                files: {
                    src: ['_site/e2/js/**/*.js', '_site/e2/css/**/*.css']
                }
            }
        },
        sass: {
            dist: {
                options: {
                    style: 'compressed'
                },
                files: {
                    'e2/css/rv7/core-support/style.css': '_scss/_style.scss'
                }
            }
        }


    });

    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-browserify');
    grunt.loadNpmTasks('grunt-banner');

    grunt.registerTask('production', ['browserify', 'uglify', 'sass']);

    grunt.registerTask('post-production', ['usebanner']);

};
