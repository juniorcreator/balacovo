let gulp = require('gulp');
let sass = require('gulp-sass');
let autoprefixer = require('gulp-autoprefixer');
let bs = require('browser-sync').create();
let sourcemaps = require('gulp-sourcemaps');
let uglify = require('gulp-uglify');
let concat = require('gulp-concat');
let babel = require('gulp-babel');

gulp.task('browser-sync', ['sass'], function() {
    bs.init({
        server: {
            baseDir: "./"
        },
        notify: false,
    });
});
gulp.task('minify', function () {
    gulp.src('src/js/concataneted.js')
        .pipe(uglify())
        .pipe(gulp.dest('src/js/min.js'));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
        .pipe(concat('main.js'))
        .pipe(gulp.dest('src/js/main_js'));
});

gulp.task('sass', function() {
    return gulp.src('src/sass/style.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', sass.logError))
        .pipe(autoprefixer('last 4 versions','true'))
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('src/css'))
        .pipe(bs.reload({
            stream: true
        }));
});

gulp.task('watch', ['browser-sync', 'sass', 'scripts'], function () {
    gulp.watch("src/sass/**/*.scss", ['sass'], bs.reload);
    gulp.watch("src/js/*.js", ['scripts'], bs.reload);
    gulp.watch('./*.html', bs.reload)
});