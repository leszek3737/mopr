const browsersync = require('browser-sync').create();
const config = require('./config');
module.exports = gulp => {
    gulp.task('browser-sync', () => {
        browsersync.init({
            server: {
                baseDir: config.path.dist,
            },
            stream: true,
        });
    });
    gulp.task('browser-sync-reload', () => {
        return browsersync.reload();
    });
};
