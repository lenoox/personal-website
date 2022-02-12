const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const rename = require('gulp-rename');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');

gulp.task('sass', function () {
    return gulp.src("assets/scss/**/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("dist/css"))
        .pipe(browserSync.stream());
});
gulp.task('min-js', function () {
    return gulp.src('src/**/*.js')
        .pipe(concat('script.js'))
        .pipe(gulp.dest('dist/js'))
        .pipe(rename('script.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest('dist/js'));
});
gulp.task('build-images', function () {
    return gulp.src(['assets/images/*.{gif,jpg,png,svg}'])
        .pipe(imagemin([
            imagemin.gifsicle({interlaced: true}),
            imagemin.mozjpeg({quality: 65, progressive: true}),
            imagemin.optipng({optimizationLevel: 5}),
            imagemin.svgo({plugins: [{removeViewBox: false}]})
        ]))
        .pipe(gulp.dest('dist/images'));
});
gulp.task('serve', gulp.series('sass', 'min-js', 'build-images', function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('assets/images/*.{gif,jpg,png,svg}', gulp.series('build-images'));
    gulp.watch("assets/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("assets/js/**/*.js", gulp.series('min-js'));
    gulp.watch("index.html").on('change', browserSync.reload);
}));

gulp.task('default', gulp.series('serve'));


