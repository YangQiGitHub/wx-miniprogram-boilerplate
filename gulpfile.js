const gulp = require('gulp');
const less = require('gulp-less');
const rename = require('gulp-rename');
const del = require('del');
const imagemin = require('gulp-imagemin');
const path = require('path');

const srcPath = './src/**';
const distPath = './dist/';
const wxmlFiles = [`${srcPath}/*.wxml`, `!${srcPath}/_template/*.wxml`];
const lessFiles = [`${srcPath}/*.less`, `!${srcPath}/styles/**/*.less`, `!${srcPath}/_template/*.less`];
const jsonFiles = [`${srcPath}/*.json`, `!${srcPath}/_template/*.json`];
const jsFiles = [`${srcPath}/*.js`, `!${srcPath}/_template/*.js`];
const imgFiles = [
  `${srcPath}/images/*.{png,jpg,gif,ico}`,
  `${srcPath}/images/**/*.{png,jpg,gif,ico}`
];
const watchPath = []
  .concat(wxmlFiles, lessFiles, jsonFiles, jsFiles, imgFiles)
  .filter(item => !/^!/.test(item));

/* 清除dist目录 */
gulp.task('clean', done => {
  del.sync(['dist/**/*']);
  done();
});

/* 编译wxml文件 */
const wxml = () => {
  return gulp.src(wxmlFiles).pipe(gulp.dest(distPath));
};
gulp.task(wxml);

/* 编译JS文件 */
const js = () => {
  return gulp.src(jsFiles).pipe(gulp.dest(distPath));
};
gulp.task(js);

/* 编译json文件 */
const json = () => {
  return gulp.src(jsonFiles).pipe(gulp.dest(distPath));
};
gulp.task(json);

/* 编译less文件 */
const wxss = () => {
  return gulp
    .src(lessFiles)
    .pipe(less())
    .pipe(rename({ extname: '.wxss' }))
    .pipe(gulp.dest(distPath));
};
gulp.task(wxss);

/* 编译压缩图片 */
const img = () => {
  return gulp
    .src(imgFiles)
    .pipe(imagemin())
    .pipe(gulp.dest(distPath));
};
gulp.task(img);

/* build */
gulp.task(
  'default',
  gulp.series('clean', gulp.parallel('wxml', 'js', 'json', 'wxss', 'img'))
);

/* watch */
gulp.task('watch', () => {
  gulp.watch(lessFiles, wxss);
  gulp.watch(jsFiles, js);
  gulp.watch(imgFiles, img);
  gulp.watch(jsonFiles, json);
  gulp.watch(wxmlFiles, wxml);
});

/* dev */
gulp.task('dev', gulp.series('default', 'watch'));

/**
 * auto 自动创建page or template or component
 *  -s 源目录（默认为_template） -d 目的目录（即要生成的目录名) -t 生成的类型 p page t template c component  （默认 p)
 * @example
 * gulp auto -s=xx -d=xxx -t=p
 * gulp auto -s=_template -d=mypage
 * gulp auto  -d=testt -t=t
 */
const auto = () => {
  const argv = require('yargs').argv;
  let source = argv.s || '_template';
  let destination = argv.d;
  let type = argv.t || 'p';
  let typeEnum = {
    p: 'pages',
    t: 'template',
    c: 'components'
  };
  let root = path.join(__dirname, 'src', typeEnum[type]);

  return gulp
    .src(path.join(root, source, `*.*`))
    .pipe(
      rename({
        dirname: destination,
        basename: destination
      })
    )
    .pipe(gulp.dest(path.join(root)));
};
gulp.task(auto);
