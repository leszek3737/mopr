const $ = require('gulp-load-plugins')();
const config = require('./config');
module.exports = gulp => {
    gulp.task('clean', () => {
        return gulp
            .src(config.path.dist + '*', {
                read: false
            })
            .pipe($.clean());
    });
};
