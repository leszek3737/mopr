const $ = require('gulp-load-plugins')();
const config = require('./config');
const fs = require('fs');
module.exports = gulp => {
    gulp.task('build-javascript', ['build-javascript-lib'], () => {
        return gulp.src(config.concatOrder.js)
            .pipe($.sourcemaps.init())
            .pipe($.babel())
            .pipe($.dedupe())
            .pipe($.concat(config.name.js))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(config.path.js));
    });
    gulp.task('build-javascript:prod', ['build-javascript-lib'], () => {
        return gulp.src(config.concatOrder.js)
            .pipe($.babel())
            .pipe($.dedupe())
            .pipe($.concat(config.name.jsMin))
            .pipe($.uglify())
            .pipe(gulp.dest(config.path.js));
    });
    gulp.task('build-javascript-lib', () => {
        return gulp.src(config.concatOrder.jsLib)
            .pipe($.concat(config.name.jsMinLib))
            .pipe(gulp.dest(config.path.js));
    });
    gulp.task('javascript', ['build-javascript', ]);
    gulp.task('javascript:prod', ['build-javascript:prod']);
};
