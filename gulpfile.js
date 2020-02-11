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

    bootstrapCSS: "node_modules/bootstrap/dist/css/*.min.css",
    bootstrapJS: "node_modules/bootstrap/dist/js/*bundle.min.js",
  
    dist: 'dist',
    distIndex: 'dist/index.html',
    distCSS: 'dist/**/*.css',
    distJS: 'dist/**/*.js',
    distJSPath: 'dist/js',
    distCSSPath: 'dist/css',

    srcPathOptions: {
        allowEmpty: true
    }
  };

gulp.task('sass', function(){
    return gulp.src(paths.appSASS, paths.srcPathOptions)
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest(paths.dist))
});

gulp.task('css', function () {
    return gulp.src([paths.appCSS, paths.bootstrapCSS], paths.srcPathOptions).pipe(gulp.dest(paths.distCSSPath));
});

gulp.task('js', function () {
    return gulp.src([paths.appJS, paths.bootstrapJS], paths.srcPathOptions).pipe(gulp.dest(paths.distJSPath));;
});

gulp.task('html', function () {
    return gulp.src(paths.appHTML, paths.srcPathOptions).pipe(gulp.dest(paths.dist));
});

gulp.task('copy', gulp.series('sass', 'css', 'js', 'html'));

gulp.task('inject', gulp.series('copy', function(){
    var css = gulp.src(paths.distCSS, paths.srcPathOptions);
    var js = gulp.src(paths.distJS, paths.srcPathOptions);

    var options = { relative: false, ignorePath: ["dist"] };

    return gulp.src(paths.appIndex, paths.srcPathOptions)
        .pipe(inject(css, options))
        .pipe(inject(js, options))
        .pipe(gulp.dest(paths.dist));
}));

gulp.task('serve', gulp.series('inject', function(){
    return gulp.src(paths.dist, paths.srcPathOptions)
        .pipe(webserver({
            port: 3000,
            livereload: true
        }));
}));

gulp.task('watch', gulp.series('serve', function(){
    gulp.watch(paths.app, gulp.series('inject'));
}));

gulp.task('default', gulp.series('watch'));
