// initialise modules.
const gulp = require('gulp');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const browserSync = require('browser-sync').create();

// not currently used but can be added later on.
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const concat = require('gulp-concat');
const postcss = require('gulp-postcss');
const replace = require('gulp-replace');
const uglify = require('gulp-uglify');



// file path variables.

const source = "./process/";
const dest = "./builds/portfolio/";

//html task.

function html() {
    return gulp.src(dest + "**/*.html");
}

// sass task.

function styles() {
    return gulp
        .src(source + "sass/styles.scss")
        .pipe(sourcemaps.init())
        .pipe(
            sass({
                sourcemap: true,
                style: "expanded"
            }).on("error", sass.logError)
        )
        .pipe(gulp.dest(dest + "css"));
}

// js task.


function js() {
    return gulp.src(dest + "**/*.js");
}


// watch task.

function watch() {
    gulp.watch(dest + "js/**/*.js", js).on("change", browserSync.reload);
    gulp.watch(source + "sass/**/*", styles).on("change", browserSync.reload);
    gulp.watch(dest + "index.html", html).on("change", browserSync.reload);
}

// server task.

function server() {
    browserSync.init({
        notify: false,
        server: {
            baseDir: dest
        }
    });

    gulp
        .watch(source + "sass/**/*.scss", styles)
        .on("change", browserSync.reload);
    gulp.watch(dest + "js/**/*.js", js).on("change", browserSync.reload);
    gulp.watch(dest + "index.html", html).on("change", browserSync.reload);
}


// default task.

var build = gulp.series(gulp.parallel(js, styles, html), server, watch);

gulp.task("default", build);