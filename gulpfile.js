require('es6-promise').polyfill();

var gulp = require('gulp');
var gutil = require('gulp-util'),
    gulpIf = require('gulp-if'),
    useref = require('gulp-useref'),
    uglify = require('gulp-uglify'),
    cssnano = require('gulp-cssnano'),
    del = require('del'),
    htmlmin = require('gulp-htmlmin'),
    runSequence = require('run-sequence');

var path = {};

gulp.task('useref', function() {
    return gulp.src('app/*.html')
        .pipe(useref())
        .pipe(gulpIf('*.js', uglify()))
        .pipe(gulpIf('*.css', cssnano({
            autoprefixer: {
                cascade: false
            }
        })))
        .pipe(gulpIf('*.html', htmlmin({
            collapseWhitespace: true
        })))
        .pipe(gulp.dest('dist'));
});

gulp.task('copy:fonts', function() {
    return gulp.src('app/fonts/**/*')
        .pipe(gulp.dest('dist/fonts'));
});

gulp.task('copy:images', function() {
    return gulp.src('app/images/+(png|jpg|svg)/**/*')
        .pipe(gulp.dest('dist/images'));
});

gulp.task('clean:dist', function() {
    return del.sync('dist');
});

gulp.task('build', function() {
    runSequence('clean:dist', ['useref', 'copy:fonts', 'copy:images'], function() {
        gutil.log(gutil.colors.green('✔ ') + 'Build has been completed');
    });
});

gulp.task('default', ['build'], function() {});