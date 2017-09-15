var gulp       	= require('gulp');
var compass 	= require('gulp-compass');
var cleanCSS 	= require('gulp-clean-css');
var gcmq 	   	= require('gulp-group-css-media-queries');
var uglify 		= require('gulp-uglify');
var concat 		= require('gulp-concat');

// Styles
gulp.task('scss', function() {
	return gulp.src('src/scss/**/*.scss')
		.pipe(compass({
			css: 'dist/css',
			sass: 'src/scss',
			sourcemap: false
		}))
		.pipe(gcmq())
		.pipe(cleanCSS())
		.pipe(gulp.dest('dist/css'));
});

// Scripts
gulp.task('scripts', function() {
	return gulp.src('src/js/**/*.js')
		.pipe(uglify())
		.pipe(concat('functions.js'))
		.pipe(gulp.dest('dist/js'));
});

// Icons
gulp.task('icons', function () {
	return gulp.src('src/icons/**/*.{eot,ttf,woff,woff2,svg}')
		.pipe(gulp.dest('dist/font'));
});

// Libs
gulp.task('libs', function() {
	return gulp.src([
			'node_modules/jquery/dist/jquery.min.js',
			// 'node_modules/bootstrap/dist/js/bootstrap.min.js',
			'node_modules/bootstrap/dist/css/bootstrap.min.css',
			'node_modules/angular/angular.min.js'
		])
		.pipe(gulp.dest('dist/libs'));
});

// Default
gulp.task('default', ['scss','scripts','libs','icons']);

// Dev
gulp.task('dev', ['default'], function() {
	gulp.watch('src/scss/**/*.scss', ['scss']);
	gulp.watch('src/js/**/*.js', ['scripts']);
	gulp.watch('src/icons/**/*.{eot,ttf,woff,woff2,svg}', ['icons']);
});