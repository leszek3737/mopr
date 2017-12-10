module.exports = {
    glob: {
        src: "./src/**/*",
        scss: './src/**/*.scss',
        js: './src/**/*.js',
        html: './src/**/*.html',
        fonts: './src/fonts/**/*',
        fontsLib: '',
        img: './src/img/**/*',
    },
    entryPoint: {
        scss: './src/scss/style.scss'
    },
    path: {
        css: './dist/css/',
        js: './dist/js/',
        dist: './dist/',
        fonts: './dist/fonts/',
        fontsLib: './dist/fonts/bootstrap/',
        vector: './dist/img/',
        img: './dist/img/',
    },
    concatOrder: {
        js: './src/**/*.js',
        jsLib: []
    },
    name: {
        js: "app.js",
        jsMin: "app.min.js",
        jsMinLib: "assets.min.js",
        css: "app.css",
        cssMin: "app.min.css",
    }
};
