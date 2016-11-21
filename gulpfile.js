/**
 * gulpのプラグイン
 *
 * gulp           : 基本機能
 * gulp-babel     : ES6 -> ES5
 * gulp-changed   : 変更のあったファイルのみ処理
 * gulp-notify    : デスクトップ通知
 * gulp-pleeease  : CSS最適化
 * gulp-plumber   : エラー時にgulpを終了させない
 * gulp-sass      : Sassコンパイラ
 * gulp-uglify    : JS圧縮
 * browser-sync   : ブラウザ同期
 */

var
  gulp          = require("gulp"),
  babel         = require("gulp-babel"),
  changed       = require('gulp-changed'),
  notify        = require('gulp-notify'),
  please        = require('gulp-pleeease'),
  plumber       = require('gulp-plumber'),
  sass          = require('gulp-sass'),
  browserSync   = require('browser-sync').create();

var
  SRC   = 'src/',
  TEST  = 'test/',
  DEST  = 'dist/',
  CSS   = 'css/',
  JS    = 'js/';

var path = {
  src:  {
    css : SRC + CSS,
    js  : SRC + JS
  },
  test: {
    css : TEST + CSS,
    js : TEST + JS
  },
  'dest': {
    'css' : DEST + CSS,
    'js'  : DEST + JS
  }
};

// JS
gulp.task('babel', function () {
  gulp.src(path.src.js + '*.es6')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(changed(path.test.js))
    .pipe(babel({presets: ['es2015']}))
    .pipe(gulp.dest(path.test.js))
    .pipe(browserSync.stream());
});

// CSS
gulp.task('sass', function () {
  gulp.src(path.src.css + '*.scss')
    .pipe(plumber({errorHandler: notify.onError('<%= error.message %>')}))
    .pipe(changed(path.test.css))
    .pipe(sass())
    .pipe(please({
      autoprefixer: {"browsers": ["last 4 versions", "Android 2.3"]},
      minifier: false
    }))
    .pipe(gulp.dest(path.test.css))
    .pipe(browserSync.stream());
});

// browser-sync初期化
gulp.task('browser-sync', function () {
  browserSync.init({
    server: {
      baseDir: TEST,
      index: "index.html"
    }
  });
});

// ファイルの変更を監視して、ブラウザをリロード
gulp.task('default', ['browser-sync'], function () {
  gulp.watch(path.test + "*.html", browserSync.reload);
  gulp.watch(path.src.css + "*.scss", ['sass']);
  gulp.watch(path.src.js + "*.es6", ['babel']);
});
