var gulp = require('gulp');
var uglify = require('gulp-uglify');
var babel = require('gulp-babel');
var rimraf = require('gulp-rimraf')
var ngAnnotate = require('gulp-ng-annotate');
var concat = require('gulp-concat')
var sass = require('gulp-sass');
var plumber = require('gulp-plumber');


//	'task name', ['prereqs'], task-function()
gulp.task('default', ['js', 'css', 'watch']);

gulp.task('watch', ['watch:js', 'watch:css']);


//	gulp.task	//	defines a new task
//	gulp.src	//	read/input files
//	gulp.pipe	//	allows for chaining / piping code through different filters/functions/tasks/etc. (usually seen as (...).pipe())
//	gulp.dest	//	write / output files
//	gulp.watch//	watch files for changes & run tasks


gulp.task('js', ['clean:js'], function() {
	return gulp.src('client/js/**/*.js')
		.pipe(plumber())
		.pipe(ngAnnotate())
		.pipe(babel({presets:['es2015']}))
		.pipe(concat('bundle.js'))
		.pipe(uglify())
		.pipe(gulp.dest('public/js'));
});
//	watches js for changes
gulp.task('watch:js', function() {
	return gulp.watch('client/js/**/*.js', ['js']);
})
//	deletes all generated files living in 'public' dir
gulp.task('clean:js', function() {
	return gulp.src('public/js', {read:false})
		.pipe(plumber())
		.pipe(rimraf());
})

gulp.task('css', ['clean:css'], function () {
	return gulp.src(['client/scss/**/*.scss', 'client/scss/**/*.sass'])
		.pipe(plumber())
		.pipe(sass())
		.pipe(gulp.dest('public/css'));
})
//	watches scss for changes
gulp.task('watch:css', function() {
	return gulp.watch(['client/scss/**/*.scss','client/scss/**/*.sass'], ['css']);
})
gulp.task('clean:css', function() {
	return gulp.src('public/css', {read:false})
		.pipe(plumber())
		.pipe(rimraf());
})
