var gulp = require("gulp"), // Load Gulp!
// Now that we've installed the uglify package we can require it:
 uglify = require("gulp-uglify"),
 eslint = require("gulp-eslint"),
  rename = require("gulp-rename");

  var browserSync = require('browser-sync').create();

gulp.task('script', function() {
  return gulp.src('./js/*.js') // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")); // Where do we put the result?
});

gulp.task("print_Hello",function(hello){
  console.log("Hi Its gulp")
  hello();
})

gulp.task('browser-sync', function() {
  browserSync.init({
      server: {
          baseDir: "./"
      }
  });
  gulp.watch(['build/js/*.js']).on('chnage',browserSync.reload);
});

gulp.task("default", gulp.series( "script",'browser-sync'));