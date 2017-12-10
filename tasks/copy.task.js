const config = require('./config');
const runSequence = require('run-sequence');
module.exports = gulp => {
    gulp.task('copyImg', () => {
        return gulp.src(config.glob.img)
            .pipe(gulp.dest(config.path.img));
    });
    gulp.task('copyFonts', () => {
        return gulp.src(config.glob.fonts)
            .pipe(gulp.dest(config.path.fonts));
    });
    gulp.task('copyFontsLib', () => {
        return gulp.src(config.glob.fontsLib)
            .pipe(gulp.dest(config.path.fontsLib));
    });

    gulp.task('copy', done => {
        runSequence(
            'copyImg',
            'copyFonts',
            'copyFontsLib',
            done
        );
    });
    gulp.task('copy::prod', done => {
        runSequence(
            'copyMinImg::prod',
            'copyFonts',
            'copyFontsLib',
            done
        );
    });
}
