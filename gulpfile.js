// grab our gulp packages
var gulp  = require('gulp'),
    gutil = require('gulp-util');
    jshint = require('gulp-jshint');
    sass = require('gulp-sass');
    browserSync = require('browser-sync').create();
    useref = require('gulp-useref');
    uglify = require('gulp-uglify');
    pump = require('pump');
    gulpIf = require('gulp-if');
    cssnano = require('gulp-cssnano');
    imagemin = require('gulp-imagemin');
    concat = require('gulp-concat');
    runSequence = require('run-sequence');

// create a default task and just log a message
gulp.task('default', ['watch']);


gulp.task('mytask', function() {
  //do stuff
  console.log('test test')
});

gulp.task('dependenttask', ['mytask'], function() {
  //do stuff after 'mytask' is done.
  console.log('Hi its me')
});

gulp.task('copy', function() {
  // copy any html files in source/ to public/
  gulp.src('source/template/*.html').pipe(gulp.dest('public/template'));
});

gulp.task('jshint', function() {
  return gulp.src('source/js/**/*.js')
    .pipe(jshint())
    .pipe(jshint.reporter('jshint-stylish'));
});

// compile sass to css
gulp.task('sass', function(){
  return gulp.src('source/scss/style.scss')
    .pipe(sass())
    .pipe(gulp.dest('public/css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
    browserSync.init({
        proxy: "http://localhost/prices/" //either default localhost:3000 or use own url
    });
});

gulp.task('concat_css', function() {
  return gulp.src(['./source/scss/circular-progressbar.css', './source/scss/playList.css', './source/scss/timeline-widget.css'])
    .pipe(concat('main.css'))
    .pipe(gulp.dest('./public'));
});

gulp.task('concat_js', function() {
  return gulp.src(['./source/js/app.js', './source/js/YouTubePlaylist.js'])
    .pipe(concat('main.js'))
    .pipe(gulp.dest('./public'));
});

//using pump to handle errors
gulp.task('compress_js', function (callback) {
  pump([
        gulp.src('./source/js/*.js'),
        uglify(),
        gulp.dest('./public/js')
    ],
    callback
  );
});

gulp.task('compress_css', function() {
    return gulp.src('./source/scss/*.css')
        .pipe(cssnano())
        .pipe(gulp.dest('./public/css'));
});

//using pipe
gulp.task('comp', function () {
  // returns a Node.js stream, but no handling of error messages
  return gulp.src('./source/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./public/js'));
});

// configure which files to watch and what tasks to use on file changes; also run the task when file changes
gulp.task('watch', ['browserSync', 'sass'], function() {         //files to watch; tasks to run
  gulp.watch('source/scss/**/*.scss', ['sass']);
  gulp.watch('source/*.html', browserSync.reload); //watch and reload
  gulp.watch('source/js/**/*.js', browserSync.reload);
  //multiple watchers
});

//its possible the tasks will be running in a non consistent sequence
/*gulp.task('build', ['clean', 'sass', 'useref', 'images', 'fonts'], function () {
  console.log('Building files');
})*/

//runSequence run the tasks by order
gulp.task('build', function (callback) {
  runSequence(['compress_css', 'compress_js', 'concat_css', 'concat_js'],
    callback
  )
})