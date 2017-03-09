var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var runSequence = require('run-sequence');
var combiner = require('stream-combiner2');

var source = {
	js:{
		vendor:[
			'public/vendor/jquery/dist/jquery.min.js',
			'public/vendor/angular/angular.min.js',
			'public/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.concat.min.js',
			'public/vendor/ng-scrollbars/dist/scrollbars.min.js',
			'public/vendor/angular-ui-router/release/angular-ui-router.min.js',
			'public/vendor/angular-translate/angular-translate.min.js',
			'public/vendor/angular-sanitize/angular-sanitize.min.js',
			'public/vendor/angular-animate/angular-animate.min.js',
			'public/vendor/angular-aria/angular-aria.min.js',
			'public/vendor/angular-messages/angular-messages.min.js',
			'public/vendor/angular-material/angular-material.js',
			'public/vendor/ocLazyLoad/dist/ocLazyLoad.min.js'
		]
	},
	css:[
		'public/vendor/angular-material/angular-material.min.css',
		'public/vendor/malihu-custom-scrollbar-plugin/jquery.mCustomScrollbar.min.css',
		'public/stylesheets/ms.min.css'
	]
};

gulp.task('clean:app', function() {
    return gulp.src(['public/stylesheets/*.css','public/dist/*'])
    	.pipe(plugins.clean({force: true}));
});
gulp.task('sass',function(){
	return gulp.src(['public/stylesheets/ms.scss'])
		.pipe(plugins.sass({
			sourcemap: true
		}))
		.pipe(plugins.concat('ms.css'))
		.pipe(plugins.autoprefixer({
			browsers: ['last 2 versions','Android >= 4.0']
		}))
		.pipe(gulp.dest('public/stylesheets/'))
		.pipe(plugins.rename({basename: 'ms.min'}))
		.pipe(plugins.minifyCss())
        //.pipe(plugins.rev())
		.pipe(gulp.dest('public/stylesheets/'));
        //.pipe(plugins.rev.manifest())
        //.pipe(gulp.dest('public/rev/css'));
});

gulp.task('jshint',function(){
	return gulp.src(['public/javascripts/*.js','public/javascripts/**/*.js'])
		.pipe(plugins.jshint())
		.pipe(plugins.jshint.reporter('default'));
});

gulp.task('scripts:lib-dev', function() {
    return gulp.src(source.js.vendor) 
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.concat('lib.min.js'))
        .pipe(plugins.uglify({
            compress: {
                drop_console: true
            }
        })) 
        .pipe(plugins.sourcemaps.write())
        .pipe(gulp.dest('public/dist/lib')); 
});
gulp.task('scripts:module-dev', function() {
    return gulp.src(['public/javascripts/**/*.js']) 
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.uglify({
            compress: {
                drop_console: false
            }
        })) 
        .pipe(plugins.sourcemaps.write())
        //.pipe(plugins.rev())
        .pipe(gulp.dest('public/dist'));
        //.pipe(plugins.rev.manifest())
        //.pipe(gulp.dest('public/rev/js')); 
});

gulp.task('scripts:lib', function() {
    return gulp.src(source.js.vendor) 
        .pipe(plugins.concat('lib.min.js'))
        .pipe(plugins.uglify({
            compress: {
                drop_console: true
            }
        })) 
        .pipe(gulp.dest('public/dist/lib')); 
});
gulp.task('scripts:module', function() {
    return gulp.src(['public/javascripts/*.js','public/javascripts/**/*.js'])
        .pipe(plugins.uglify({
            compress: {
                drop_console: true
            }
        }))
        //.pipe(plugins.rev())
        .pipe(gulp.dest('public/dist'));
        //.pipe(plugins.rev.manifest())
        //.pipe(gulp.dest('public/rev/js')); 
});

gulp.task('rev',function(){
	return gulp.src(['public/dist/rev/**/*.json','public/javascripts/*.js'])
		.pipe(plugins.revCollectorR({
			replaceReved: true,
            isRequirejs: true
		}))
		.pipe(gulp.dest('public/dist'));
});



gulp.task('ms-dev',function(){
	runSequence('clean:app','sass',['scripts:lib-dev','scripts:module-dev']);//'clean:app',
	gulp.watch(['public/stylesheets/ms.scss'],function(){
		gulp.run(['sass']);
	});
	gulp.watch(['public/javascripts/**/*.js'],function(event){
		var paths = plugins.watchPath(event,'public/javascripts/','public/dist/');
		//one to one compile
		var combined = combiner.obj([
			gulp.src(paths.srcPath),
			plugins.sourcemaps.init(),
	        plugins.uglify(),
        	plugins.sourcemaps.write(),
	        gulp.dest(paths.distDir)
		]);
		combined.on('error',function(){
			console.log('--------------')
            console.log('Error')
            console.log('fileName: ' + err.fileName)
            console.log('lineNumber: ' + err.lineNumber)
            console.log('message: ' + err.message)
            console.log('plugin: ' + err.plugin)
		});
	});
});

gulp.task('default',function(){
	runSequence('clean:app','sass',['scripts:lib','scripts:module']);
});