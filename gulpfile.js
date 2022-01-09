const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const minify = require('gulp-minify');

gulp.task('sass', function() {
    return gulp.src("assets-dev/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("assets/css"))
        .pipe(browserSync.stream());
});
gulp.task('min-js', function() {
    return gulp.src('assets-dev/js/**/*.js')
        .pipe(minify({
            ext: {
                min: '.min.js'
            },
            ignoreFiles: ['-min.js']
        }))
        .pipe(gulp.dest('assets/js'))
});
gulp.task('serve', gulp.series('sass','min-js', function() {
    browserSync.init({
        server: "./"
    });
    gulp.watch("assets-dev/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("assets-dev/js/**/*.js", gulp.series('min-js'));
    gulp.watch("index.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));


