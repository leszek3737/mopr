const $ = require('gulp-load-plugins')();
const config = require('./config');
const runSequence = require('run-sequence');
module.exports = gulp => {
    // lint jest przygotowany do es6 a projek w tej wesji jest pisany w es5 z załorznia 
    //    gulp.task("javascript-lint", () => {
    //        return gulp.src(config.concatOrder.js)
    //            .pipe($.eslint())
    //            .pipe($.eslint.format())
    //    })
    gulp.task("sass-lint", () => {
        return gulp.src(config.glob.scss)
            .pipe($.sassLint())
            .pipe($.sassLint.format())
            .pipe($.sassLint.failOnError())
    })
    gulp.task("lint", done => {
        runSequence(
            //            "javascript-lint",
            "sass-lint",
            done
        )
    })
}
