const $ = require('gulp-load-plugins')();
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const config = require('./config');
const fs = require('fs');
module.exports = gulp => {
    gulp.task('sass', () => {
        return gulp.src(config.entryPoint.scss)
            .pipe($.sassGlob())
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.postcss([autoprefixer()]))
            .pipe($.rename(config.name.css))
            .pipe($.sourcemaps.write())
            .pipe(gulp.dest(config.path.css));
    });
    gulp.task('sass:prod', () => {
        return gulp.src(config.entryPoint.scss)
            .pipe($.sassGlob())
            .pipe($.sass().on('error', $.sass.logError))
            .pipe($.postcss([
                autoprefixer(),
                cssnano(),
                    ]))
            .pipe($.rename(config.name.cssMin))
            .pipe(gulp.dest(config.path.css));
    });
    gulp.task('style', ['sass']);
    gulp.task('style:prod', ['sass:prod']);
};
