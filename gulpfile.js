const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const runSequence = require('run-sequence');
$.loadSubtasks('tasks/**/*.task.js', $);
gulp.task('build', done => {
    runSequence(
        'clean', [
        'style',
        'javascript'
    ],
        'html',
        'copy',
        'browser-sync-reload',
        'lint',
        done
    );
});
gulp.task('build::prod', done => {
    runSequence(
        'clean', [
      'style:prod',
      'javascript:prod'
    ],
        'html:prod',
        'copy::prod',
        done
    );
});
gulp.task('default', done => {
    runSequence(
        "build",
        'browser-sync',
        'watch',
        done
    )
});
