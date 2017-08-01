var gulp = require("gulp"),
  less = require("gulp-less"),
  htmlmin = require('gulp-htmlmin'),
  cssmin = require("gulp-minify-css"),
  jshint = require('gulp-jshint'),
  imagemin = require('gulp-imagemin'),
  pngquant = require('imagemin-pngquant'), //深度压缩图片
  uglify = require("gulp-uglify"),
  concat = require("gulp-concat"),
  autoprefixer = require("gulp-autoprefixer"),
  rename = require('gulp-rename'),
  del = require('del'),
  sourcemaps = require('gulp-sourcemaps'),
  cache = require('gulp-cache'),
  rev = require('gulp-rev'), //生成md5签名
  revcollector = require('gulp-rev-collector'),
  spritesmith = require('gulp.spritesmith'),
  browserSync = require('browser-sync').create(),
  reload = browserSync.reload;

// ***************************************服务器
// // 静态服务器
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         server: {
//             baseDir: "./"
//         }
//     });
// });
// 代理
// gulp.task('browser-sync', function() {
//     browserSync.init({
//         proxy: "你的域名或IP"
//     });
// });
gulp.task('browser-sync', [
  "style", "script", "image", "html", "watch"
], function() {
  browserSync.init({server: "./sh_bulid/"});
  gulp.watch("sh_bulid/**/*.{html,js,css}").on('change', browserSync.reload);
});
// ***************************************服务器

// 雪碧图
gulp.task("spriter1",function(){
  gulp.src("aa/*.png")
  .pipe(
    spritesmith({
              imgName: 'icons2.png',     // 生成的图片
              cssName: 'icons2.css',    // 生成的sass文件
              padding: 40,              // 图标之间的距离
              algorithm: 'binary-tree'// 图标的排序方式
            })
  )
  .pipe(gulp.dest("aa/"))
});

// 清理
gulp.task("clearStyle", function() {
  return del(["sh_bulid/style/**/*"])
});
// gulp.task("clearFont", function() {
//   return del(["sh_bulid/font/**/*"])
// });
gulp.task("clearImage", function() {
  return del(["sh_bulid/image/**/*"])
});
gulp.task("clearScript", function() {
  return del(["sh_bulid/js/**/*"])
});
gulp.task("clearHtml", function() {
  return del(["sh_bulid/.html"])
});

// 样式
gulp.task("style", ["clearStyle"], function() {
  gulp.src("src/less/section/**/*.less")/*.pipe(sourcemaps.init())*/.pipe(less()).pipe(autoprefixer({
    browsers: [
      'last 2 versions', 'Android >= 4.0', 'ie 8', 'ie 9', 'ios 6'
    ],
    cascade: true, //是否美化属性值 默认：true 像这样：
    //-webkit-transform: rotate(45deg);
    //        transform: rotate(45deg);
    remove: true //是否去掉不必要的前缀 默认：true
  })).pipe(cssmin({
    compatibility: 'ie7', //保留ie7及以下兼容写法 类型：String 默认：''or'*' [启用兼容模式； 'ie7'：IE7兼容模式，'ie8'：IE8兼容模式，'*'：IE9+兼容模式]
    keepSpecialComments: '*'
    //保留所有特殊前缀 当你用autoprefixer生成的浏览器前缀，如果不加这个参数，有可能将会删除你的部分前缀
  }))/*.pipe(sourcemaps.write())*/.pipe(gulp.dest("sh_bulid/style"));
});
// js
gulp.task("pulgJs", ["clearScript"], function() {
  gulp.src("src/js/pulg/**/*").pipe(gulp.dest("sh_bulid/js"));
});
gulp.task("script", ["pulgJs"], function() {
  gulp.src("src/js/my/*.js").pipe(jshint()).pipe(jshint.reporter("default")).pipe(uglify()).pipe(gulp.dest("sh_bulid/js"));
});

// 图片
gulp.task("image", ["clearImage"], function() {
  gulp.src("src/image/**/*.{png,jpg}").pipe(cache(imagemin({
    optimizationLevel: 5, //类型：Number  默认：3  取值范围：0-7（优化等级）
    progressive: true, //类型：Boolean 默认：false 无损压缩jpg图片
    use: [pngquant({quality: '65-80'})] //使用pngquant深度压缩png图片的imagemin插件
  }))).pipe(gulp.dest("sh_bulid/image"))
});

// 字体
// gulp.task("font", ["clearFont"], function() {
//   gulp.src("src/font/**").pipe(gulp.dest("sh_bulid/font"))
// });

// html
gulp.task("html", ["clearHtml"], function() {
  gulp.src("src/page/**/*")
  .pipe(htmlmin({
    removeComments: true, //清除HTML注释
    collapseWhitespace: true, //压缩HTML
    collapseBooleanAttributes: true, //省略布尔属性的值 <input checked="true"/> ==> <input />
    removeEmptyAttributes: true, //删除所有空格作属性值 <input id="" /> ==> <input />
    removeScriptTypeAttributes: true, //删除<script>的type="text/javascript"
    removeStyleLinkTypeAttributes: true, //删除<style>和<link>的type="text/css"
    minifyJS: true, //压缩页面JS
    minifyCSS: true //压缩页面CSS
  }))
  .pipe(gulp.dest("sh_bulid"))
});

// 监视任务
gulp.task("watch", function() {
  gulp.watch("src/less/section/*.less", ["style"]);
  gulp.watch("src/image/**/*", ["image"]);
  gulp.watch("src/js/*.js", ["script"]);
  // gulp.watch("src/font/**/*", ["font"]);
  gulp.watch("src/page/*.html", ["html"]);
  // browser-sync
});
// 默认
gulp.task("default", ["browser-sync"]);
