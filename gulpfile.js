import gulp from 'gulp';
import dartSass from 'sass';
import gulpSass from 'gulp-sass';
import browserSync from 'browser-sync';
import concat from 'gulp-concat';
import rename from 'gulp-rename';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import mozjpeg from 'imagemin-mozjpeg';
const sass = gulpSass(dartSass);

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
            //imagemin.gifsicle({interlaced: true}),
            mozjpeg({quality: 65, progressive: true}),
            //imagemin.optipng({optimizationLevel: 5}),
            //imagemin.svgo({plugins: [{removeViewBox: false}]})
        ]))
        .pipe(gulp.dest('dist/images'));
});

gulp.task('browser-sync', gulp.series(function () {
    browserSync.init({
        server: "./"
    });
    gulp.watch('assets/images/*.{gif,jpg,png,svg}', gulp.series('build-images'));
    gulp.watch("assets/scss/**/*.scss", gulp.series('sass'));
    gulp.watch("assets/js/**/*.js", gulp.series('min-js'));
    gulp.watch("index.html").on('change', browserSync.reload);
}));
gulp.task('start', gulp.series('sass', 'min-js', 'build-images','browser-sync'));
gulp.task('build', gulp.series('sass', 'min-js', 'build-images'));
