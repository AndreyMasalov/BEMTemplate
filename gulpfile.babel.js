'use strict';

// Импорт плагинов
import gulp from 'gulp';
import clean from 'gulp-clean';
import htmlmin from 'gulp-htmlmin';
import rename from 'gulp-rename';
import plumber from 'gulp-plumber';
import webpackstream from 'webpack-stream';
import webpackconfig from './webpack.config.js';
import webpack from 'webpack';
// import imagemin from 'gulp-imagemin';
import browsersync from 'browser-sync';

// Путь к файлам
const paths = {
    html: { src: 'src/**/*.html', dest: 'dist' },
    cssjs: { src: 'src/**/*.+(scss|js)', dest: 'dist' },
    img: { src: 'src/**/*.+(jpg|png|svg|gif)', dest: 'dist' }
};

// Очистка директории dist
function clear() {
    return gulp.src('dist/*', { read: false })
        .pipe(clean());
}

// Обработка HTML
function html() {
    return gulp.src(paths.html.src)
        .pipe(htmlmin({ collapseWhitespace: true }))
        .pipe(rename({ dirname: './', basename: 'index' }))
        .pipe(gulp.dest(paths.html.dest))
        .pipe(browsersync.stream());
}

// Обработка CSS и JS c помощью Webpack
function cssjs() {
    return gulp.src(paths.cssjs.src)
        .pipe(plumber(function (error) {
            console.log(error);
            this.emit('end');
        }))
        .pipe(webpackstream(webpackconfig, webpack))
        .pipe(gulp.dest(paths.cssjs.dest))
        .pipe(browsersync.stream());
}

// Обработка изображений
function img() {
    return gulp.src(paths.img.src)
        // .pipe(imagemin())
        .pipe(rename({ dirname: 'img' }))
        .pipe(gulp.dest(paths.img.dest));
}

// Обработка шрифтов
// function font() {

// }

// Веб-сервер BrowserSync
function browserSync() {
    browsersync.init({ server: { baseDir: 'dist' }, port: 3000 });
}

// Обновление BrowserSync
// function browserSyncReload(done) {
//     browsersync.reload();
//     done();
// }

// Отслеживание изменений в файлах
function watchFiles() {
    gulp.watch(paths.html.src, html);
    gulp.watch(paths.cssjs.src, cssjs);
    // gulp.watch(paths.img.src, gulp.series(img, browserSyncReload));
}

// Экспорт задач
export const build = gulp.series(clear, gulp.parallel(html, cssjs, img));
export const watch = gulp.parallel(watchFiles, browserSync);