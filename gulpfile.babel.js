'use strict';

// Импорт плагинов
import gulp from 'gulp';
import clean from 'gulp-clean';
import plumber from 'gulp-plumber';
import htmlmin from 'gulp-htmlmin';
import sass from 'gulp-sass';
import rename from 'gulp-rename';
import postcss from 'gulp-postcss';
import autoprefixer from 'autoprefixer';
import cssnano from 'cssnano';
import babel from 'gulp-babel';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
// import imagemin from 'gulp-imagemin';
import browsersync from 'browser-sync';

// Путь к файлам src
const src = 'src/**/';

// Путь к файлам
const paths = {
    html: { src: 'src/*.html', dest: 'dist' },
    css: { src: 'src/**/*.scss', dest: 'dist' },
    js: { src: 'src/**/*.js', dest: 'dist', concat: [ 
        src + 'block.js'
    ] },
    img: { src: 'src/**/*.+(jpg|jpeg|png|svg|gif)', dest: 'dist' }
};

// Очистка директории dist
function clear() {
    return gulp.src('dist/*', { read: false })
        .pipe(plumber())
        .pipe(clean());
}

// Обработка HTML
function html() {
    return gulp.src(paths.html.src)
        .pipe(plumber())
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(gulp.dest(paths.html.dest));
}

// Обработка CSS
function css() {
    return gulp.src(paths.css.src)
        .pipe(plumber())
        .pipe(sass({ outputStyle: 'expanded' }))
        .pipe(rename({ dirname: 'css', basename: 'style', suffix: '.min', extname: '.css' }))
        .pipe(postcss([ autoprefixer(), cssnano() ]))
        .pipe(gulp.dest(paths.css.dest))
        .pipe(browsersync.stream());
}

// Обработка JS
function js() {
    return gulp.src(paths.js.concat)
        .pipe(plumber())
        .pipe(babel())
        .pipe(concat('script.js'))
        .pipe(rename({ dirname: 'js', suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest(paths.js.dest));
}

// Обработка изображений
function img() {
    return gulp.src(paths.img.src)
        .pipe(plumber())
        // .pipe(imagemin())
        .pipe(rename({ dirname: 'img' }))
        .pipe(gulp.dest(paths.img.dest));
}

// Обработка шрифтов

// Веб-сервер BrowserSync
function browserSync() {
    browsersync.init({ server: { baseDir: 'dist' }, port: 3000 });
}

// Обновление BrowserSync
function browserSyncReload(done) {
    browsersync.reload();
    done();
}

// Отслеживание изменений в файлах
function watchFiles() {
    gulp.watch(paths.html.src, gulp.series(html, browserSyncReload));
    gulp.watch(paths.css.src, css);
    gulp.watch(paths.js.src, gulp.series(js, browserSyncReload));
    gulp.watch(paths.img.src, gulp.series(img, browserSyncReload));
}

// Экспорт задач
export const build = gulp.series(clear, gulp.parallel(html, css, js, img));
export const watch = gulp.parallel(watchFiles, browserSync);