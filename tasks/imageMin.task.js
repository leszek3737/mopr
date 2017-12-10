const config = require('./config');
const $ = require('gulp-load-plugins')();
module.exports = gulp => {
    gulp.task('copyMinImg::prod', () => {
        return gulp.src(config.glob.img)
            .pipe($.imagemin())
            .pipe(gulp.dest(config.path.img));
    });
}
