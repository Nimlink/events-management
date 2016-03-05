'use strict';
module.exports = function (grunt) {

    // Load grunt tasks automatically
    require('load-grunt-tasks')(grunt);

    // Show grunt task time
    require('time-grunt')(grunt);

    grunt.loadNpmTasks('grunt-connect-proxy');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-htmlmin');

    // Configurable paths for the app
    var appConfig = {
        app: 'app',
        backend: 'backend',
        be: 'build/node',
        dist: 'build/angular'
    };

    // Grunt configuration
    grunt.initConfig({

        // Project settings
        fup: appConfig,

        // The grunt server settings
        connect: {
            options: {
                port: 9000,
                hostname: 'localhost',
                livereload: 35729
            },
            livereload: {
                options: {
                    open: true,
                    middleware: function (connect) {
                        return [
                            connect.static('.tmp'),
                            connect().use(
                                '/bower_components',
                                connect.static('./bower_components')
                            ),
                            connect.static(appConfig.app),
                            connect.static(appConfig.be)
                        ];
                    }
                }
            },
            dist: {
                options: {
                    open: true,
                    base: '<%= fup.dist %>'
                }
            }
        },
        // Compile less to css
        less: {
            development: {
                options: {
                    compress: true,
                    optimization: 2
                },
                files: {
                    "app/styles/style.css": "app/less/style.less"
                }
            }
        },
        // Watch for changes in live edit
        watch: {
            styles: {
                files: ['app/styles/*.css'],
                tasks: ['less', 'copy:styles'],
                options: {
                    nospawn: true,
                    livereload: '<%= connect.options.livereload %>'
                },
            },
            js: {
                files: ['<%= fup.app %>/scripts/{,*/}*.js',
                    '<%= fup.be %>/{,*/}*.js'],
                options: {
                    livereload: '<%= connect.options.livereload %>'
                }
            },
            livereload: {
                options: {
                    livereload: '<%= connect.options.livereload %>'
                },
                files: [
                    '<%= fup.app %>/**/*.html',
                    '.tmp/styles/{,*/}*.css',
                    '<%= fup.app %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}'
                ]
            }
        },
        nodemon: {
            dev: {
                script: 'server.js'
            }
        },
        // If you want to turn on uglify you will need write your angular code with string-injection based syntax
        // For example this is normal syntax: function exampleCtrl ($scope, $rootScope, $location, $http){}
        // And string-injection based syntax is: ['$scope', '$rootScope', '$location', '$http', function exampleCtrl ($scope, $rootScope, $location, $http){}]
        uglify: {
            options: {
                mangle: false
            },

            dist: {
                files: {
                    '<%= fup.dist %>/project.js': ['<%= fup.dist %>/project.js']
                }
            }
        },
        // Clean dist folder
        clean: {
            dist: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= fup.dist %>/{,*/}*',
                        '!<%= fup.dist %>/.git*'
                    ]
                }]
            },
            be: {
                files: [{
                    dot: true,
                    src: [
                        '.tmp',
                        '<%= fup.be %>/{,*/}*',
                        '!<%= fup.be %>/.git*'
                    ]
                }]
            },
            server: '.tmp'
        },

        htmlrefs: {
            dist: {src: '.tmp/index.html'}
        },

        // Copies remaining files to places other tasks can use
        copy: {
            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= fup.app %>',
                        dest: '<%= fup.dist %>',
                        src: [
                            '*.{ico,png,txt}',
                            '.htaccess',
                            '**/*.html',
                            '**/*.js',
                            '**/*.eot',
                            '**/*.svg',
                            '**/*.ttf',
                            '**/*.woff',
                            '{,*/}*.html',
                            'styles/patterns/*.*',
                            'img/{,*/}*.*'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/fontawesome',
                        src: ['fonts/*.*'],
                        dest: '<%= fup.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: 'bower_components/bootstrap',
                        src: ['fonts/*.*'],
                        dest: '<%= fup.dist %>'
                    },
                ]
            },
            be: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= fup.backend %>',
                        dest: '<%= fup.be %>/backend',
                        src: [
                            '**/*.js',
                            '**/*.json'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        dest: '<%= fup.be %>',
                        src: [
                            'server.js'
                        ]
                    },
                    {
                        expand: true,
                        dot: true,
                        dest: '<%= fup.be %>',
                        src: [
                            'package.json'
                        ]
                    }
                ]
            },
            styles: {
                expand: true,
                cwd: '<%= fup.app %>/styles',
                dest: '.tmp/styles/',
                src: '{,*/}*.css'
            },
            tmpToDist: {
                files: [
                    {
                        expand: true,
                        cwd: '.tmp',
                        src: 'app/index.html',
                        dest: '<%= fup.dist %>'
                    },
                    {
                        expand: true,
                        dot: true,
                        cwd: '.tmp/concat',
                        src: ['app/*.js'],
                        dest: '<%= fup.dist %>'
                    }
                ]
            }
        },
        // Renames files for browser caching purposes
        filerev: {
            dist: {
                src: [
                    '<%= fup.dist %>/scripts/{,*/}*.js',
                    '<%= fup.dist %>/styles/{,*/}*.css',
                    '<%= fup.dist %>/styles/fonts/*'
                ]
            }
        },
        htmlmin: {
            dist: {
                options: {
                    collapseWhitespace: true,
                    conservativeCollapse: true,
                    collapseBooleanAttributes: true,
                    minifyJS: true,
                    removeComments: true,
                    removeCommentsFromCDATA: true,
                    removeOptionalTags: true
                },
                files: [{
                    expand: true,
                    cwd: '<%= fup.dist %>',
                    src: ['<%= fup.dist %>/index.html'],
                    dest: '<%= fup.dist %>'
                }]
            }
        },
        useminPrepare: {
            html: '.tmp/index.html',
            options: {
                dest: 'dist'
            }
        },
        usemin: {
            html: ['dist/index.html']
        },
        nginx: {
            options: {
                config: './conf/nginx.conf',
                prefix: './nginx/'
            }
        },
        concurrent: {
            options: {
                logConcurrentOutput: true
            },
            tasks: ['nodemon', 'watch', 'nginx:start']
        },
        concat: {
            options: {
                separator: ';',
            },
            dist: {
                src: ['app/**.js','app/*/**.js'],
                dest: '<%= fup.dist %>/project.js',
            },
        },
    });

    // Run live version of app
    grunt.registerTask('live', [
        'clean:server',
        'copy:styles',
        'connect:livereload',
        'concurrent'
    ]);

    // Run build version of app
    grunt.registerTask('server', [
        'build',
        'connect:dist:keepalive'
    ]);

    // Build version for production
    grunt.registerTask('build', [
        'clean:dist',
        'clean:be',
        'less',
        'useminPrepare',
        'copy:dist',
        'copy:be',
        'uglify',
        'filerev',
        'usemin',
        'htmlmin:dist'
    ]);

    // Build version for production
    grunt.registerTask('build-dev', [
        'clean:dist',
        'copy:dist',
    ]);


};
