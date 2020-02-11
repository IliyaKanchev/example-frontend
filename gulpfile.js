var gulp = require('gulp');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

var paths = {
    app: 'app/**/*',
    appCSS: 'app/**/*.css',
    appJS: 'app/**/*.js',
    appIndex: 'app/index.html',
  
    dist: 'dist',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js',
    distIndex: 'dist/index.html'
  };

gulp.task('hello', function(cb) {
    console.log('Hello Zell');
    cb();
});

gulp.task('copy', function () {
    return gulp.src(paths.app).pipe(gulp.dest(paths.dist));
});

gulp.task('inject', gulp.series('copy', function(){
    var css = gulp.src(paths.distCSS);
    var js = gulp.src(paths.distJS);
    return gulp.src(paths.distIndex)
        .pipe(inject( css, { relative:true } ))
        .pipe(inject( js, { relative:true } ))
        .pipe(gulp.dest(paths.dist));
}));

gulp.task('serve', gulp.series('inject', function(){
    return gulp.src(paths.dist)
        .pipe(webserver({
            port: 3000,
            livereload: true
        }));
}));

gulp.task('watch', gulp.series('serve', function(){
    gulp.watch(paths.app, gulp.series('inject'));
}));
