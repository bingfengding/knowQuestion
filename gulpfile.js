var gulp = require('gulp');
var uglify = require('gulp-uglify');
var imagemin = require('gulp-imagemin');
var del = require('del');
var stylus = require('gulp-stylus');
//输出位置
var paths = {
	styles:['./build/stylus/*.styl'],
	scripts: ['./build/js/index.js'],
	images: ['./build/image/*']
};

//清除
gulp.task('clean-img', function() {
	return del(["./product/image"])
});

gulp.task('clean-css', function() {
	return del(["./product/css"])
});

gulp.task('clean-js', function() {
	return del(["./product/js"])
});

//运行js
gulp.task('styles',['clean-css'], function() {
	return gulp.src(paths.styles)
		.pipe(stylus({
			compress:0
		}))
		.pipe(gulp.dest('./product/css'));
});

gulp.task('scripts',['clean-js'], function() {
	// Minify and copy all JavaScript (except vendor scripts)
	// with sourcemaps all the way down
	return gulp.src(paths.scripts)
		.pipe(uglify())
		.pipe(gulp.dest('./product/js'));
});

// Copy all static images
gulp.task('images', ['clean-img'], function() {
	return gulp.src(paths.images)
	// Pass in options to the task
		.pipe(imagemin({optimizationLevel: 5}))
		.pipe(gulp.dest('./product/image'));
});

// Rerun the task when a file changes 监听
gulp.task('watch', function() {
	gulp.watch(paths.scripts, ['scripts']);
	gulp.watch(paths.images, ['images']);
	gulp.watch(paths.styles, ['styles']);
});

// The default task (called when you run `gulp` from cli)
gulp.task('default', ['watch', 'scripts', 'images','styles']);