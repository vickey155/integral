
var gulp = require('gulp-help')(require('gulp'));
var $gulp = require('gulp');
var config = require('./../config.js');
var handleErrors = require('../utils/handleErrors');
var gulpScss = require('gulp-sass');
var gulpJade = require('gulp-jade');
var gulpPlumber = require('gulp-plumber'); //prevent pipe breaking caused by errors from gulp plugins  使用plumber 模块可以在纠正错误后继续执行任务
var gulpUglify = require("gulp-uglify");
var gulpBabel = require('gulp-babel');

var browserSync = require('browser-sync');
var runSequence = require("run-sequence");
var gulpCache = require('gulp-cache');
var del = require('del');

var reload = browserSync.reload;


gulp.task('style',function(){
	return gulp.src(config.style.src)
        .pipe(gulpScss())
        .on('error',handleErrors)
        .pipe(gulp.dest(config.style.dist));
});

gulp.task("script",function(){
	return gulp.src(config.script.src)
			.pipe(gulpBabel())
            .on("error",handleErrors)
			.pipe(gulp.dest(config.script.dist));
});

/*gulp.task("script",function(){
		return browserify('src/global/js/layout.js')
            .transform(babelify, {presets: ['es2015','react']})  // babelify本来的主要作用是进行 ES6 的编译，但是我们这里是使用它的 JSX 编译功能
            .bundle()      //把所以js代码合并成一个文件
            .pipe(source('bundle.min.js'))   //转换成文件流
            .pipe(gulpStreamIfy(gulpUglify('bundle.min.js')))
            .pipe(gulp.dest(config.script.dist))
});*/

var compressing = true;

gulp.task("image",function(){
	return gulp.src(config.image.src)
		//.pipe(gulpIf(compressing,gulpCache(imageMin(config.image.imageCfg))))
		.pipe(gulp.dest(config.image.dist));
});


gulp.task('clearCache', 'Clear Imagemin cache', function (done) {
    gulpCache.clearAll(done);
});

//使用webstorm时  有时会默认选择自动编译jade,直接编译在jade文件下html页面，需要关闭webstorm中的jade编译功能
gulp.task('template',function(){
	return gulp.src(config.template.src)
		.pipe(gulpPlumber(handleErrors))
        .pipe(gulpJade(config.template.cfg))
		.pipe(gulp.dest(config.template.dist));

});

gulp.task("clean:css",'delete dist/ css',function(){
		return del(['dist/global/css/*']);
});
gulp.task("clean:js",'delete dist/ js',function(){
    return del(['dist/global/js/*']);
});
gulp.task("clean:image",'delete dist/ images',function(){
    return del(['dist/global/images/*']);
});
gulp.task("clean:dist",'delete dist/ folders',function(){
    return del(['dist/*']);
});


gulp.task('browser-sync', false, function() {
  browserSync(config.browserSync.dev);
});


gulp.task('watch', 'Watch source files', function () {
    gulp.watch(config.watch.scss, ['style',reload]);
    gulp.watch(config.watch.script, ['script', reload]);
    gulp.watch(config.watch.image, ['image', reload]);
    gulp.watch(config.watch.jade, ['template', reload]);
});


gulp.task('serve','Serve project with livereload and file watching',function(cb){
		runSequence(
				['style','script','image','template'],
				'browser-sync',
				'watch',
				cb
			);
});



