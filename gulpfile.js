var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var webserver = require('gulp-webserver');

var paths = {
    app: 'app/**/*',
    appHTML: 'app/**/*.html',
    appCSS: 'app/**/*.css',
    appSASS: 'app/**/*.sass',
    appJS: 'app/**/*.js',
    appIndex: 'app/index.html',
  
    dist: 'dist',
    distIndex: 'dist/index.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js'
  };

gulp.task('sass', function(){
    return gulp.src(paths.appSASS, { allowEmpty: true })
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest(paths.dist))
});

gulp.task('css', function () {
    return gulp.src(paths.appCSS, { allowEmpty: true }).pipe(gulp.dest(paths.distCSS));
});

gulp.task('js', function () {
    return gulp.src(paths.appJS, { allowEmpty: true }).pipe(gulp.dest(paths.distJS));
});

gulp.task('html', function () {
    return gulp.src(paths.appHTML, { allowEmpty: true }).pipe(gulp.dest(paths.dist));
});

gulp.task('copy', gulp.series('sass', 'css', 'js', 'html'));

gulp.task('inject', gulp.series('copy', function(){
    var css = gulp.src(paths.distCSS, { allowEmpty: true });
    var js = gulp.src(paths.distJS, { allowEmpty: true });

    var options = { relative: false, ignorePath: ["dist"] };

    return gulp.src(paths.appIndex, { allowEmpty: true })
        .pipe(inject( css, options))
        .pipe(inject( js, options))
        .pipe(gulp.dest(paths.dist));
}));

gulp.task('serve', gulp.series('inject', function(){
    return gulp.src(paths.dist, { allowEmpty: true })
        .pipe(webserver({
            port: 3000,
            livereload: true
        }));
}));

gulp.task('watch', gulp.series('serve', function(){
    gulp.watch(paths.app, gulp.series('inject'));
}));

gulp.task('default', gulp.series('watch'));
