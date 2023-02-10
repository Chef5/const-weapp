const gulp = require('gulp');
const less = require('gulp-less');
const cssmin = require('gulp-clean-css');
const rename = require('gulp-rename');
const clean = require('gulp-clean');
const directoryMap = require('node-map-directory');
const replace = require('gulp-replace');
const ignoreDirectory = require('./docIgnoreDirectory');

gulp.task('compile-clean', () => {
  return gulp.src('../examples/lib', { allowEmpty: true })
      .pipe(clean({force: true}));
});

gulp.task('compile-css', () => {
    return gulp.src(['../src/**/*.less', '!../src/**/_*.less'])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename((path) => {
            path.extname = '.wxss';
        }))
        .pipe(gulp.dest('../examples/lib/'));
});

gulp.task('compile-js', () => {
    return gulp.src(['../src/**/*.js'])
        .pipe(gulp.dest('../examples/lib/'));
});

gulp.task('compile-json', () => {
    return gulp.src(['../src/**/*.json'])
        .pipe(gulp.dest('../examples/lib/'));
});

gulp.task('compile-wxml', () => {
    return gulp.src(['../src/**/*.wxml'])
        .pipe(gulp.dest('../examples/lib/'));
});

gulp.task('compile-docs', (callback) => {
  directoryMap('../src')
  .then(function(dirMap) {
    const directory = (dirMap || [])
      .filter((t) => t.type === 'dir' && !ignoreDirectory.includes(t.name))
      .map((d) => d.name);
    const fill = '\n' + ' '.repeat(6 * 2);
    const fillEnd = '\n' + ' '.repeat(5 * 2);
    const components = directory.map((item) => `'${item}/'`).join(`,${fill}`);
    gulp.src(['../src/.vuepress/config.js'])
      .pipe(replace(/(children:\s\[)[\S\s]*(?=(\s*\],\s\/\/\scompile-docs))/g, `$1${fill}${components}${fillEnd}`))
      .pipe(gulp.dest('../src/.vuepress'));
    callback();
  });
});

gulp.task('auto', (callback) => {
    gulp.watch('../src/**/*.less', gulp.series(['compile-css']));
    gulp.watch('../src/**/*.js', gulp.series(['compile-js']));
    gulp.watch('../src/**/*.json', gulp.series(['compile-json']));
    gulp.watch('../src/**/*.wxml', gulp.series(['compile-wxml']));
    gulp.watch('../src/**', gulp.series(['compile-docs']));
    callback();
});

gulp.task('default', gulp.series('compile-clean', 'compile-css', 'compile-js', 'compile-json', 'compile-wxml', 'compile-docs', 'auto'));

