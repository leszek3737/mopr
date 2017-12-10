const config = require('./config');
const runSequence = require('run-sequence');
module.exports = gulp => {
    gulp.task('watch', () => {
        gulp.watch(config.glob.src, [
        'watch-src',
      ]);
    });
    gulp.task('watch-src', done => {
        runSequence(
            'build',
            'browser-sync-reload',
            done
        );
    })
}
