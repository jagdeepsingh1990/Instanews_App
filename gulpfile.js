var gulp = require("gulp"), // Load Gulp!
  // Now that we've installed the uglify package we can require it:
  uglify = require("gulp-uglify"),
  eslint = require("gulp-eslint"),
  rename = require("gulp-rename"),
  sass = require("gulp-sass"),
  autoprefixer = require("gulp-autoprefixer"),
  cssnano = require("gulp-cssnano"),
  prettyError = require("gulp-prettyerror");

var browserSync = require("browser-sync").create();

gulp.task("script", function() {
  return gulp
    .src("./js/*.js") // What files do we want gulp to consume?
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(uglify()) // Call the uglify function on these files
    .pipe(rename({ extname: ".min.js" })) // Rename the uglified file
    .pipe(gulp.dest("./build/js")) // Where do we put the result?
    .pipe(browserSync.stream());
});

gulp.task("sass", function() {
  return gulp
    .src("./sass/style.scss")
    .pipe(prettyError())
    .pipe(sass())
    .pipe(
      autoprefixer({
        browsers: ["last 2 versions"]
      })
    )
    .pipe(gulp.dest("./build/css"))
    .pipe(cssnano())
    .pipe(rename("style.min.css"))
    .pipe(gulp.dest("./build/css"))
    .pipe(browserSync.stream());
});



gulp.task("watch", function() {
  gulp.watch(["./sass/*.scss"], gulp.series("sass")); // Reload on vendorsJs file changes.
  gulp.watch("./js/*.js", gulp.series("script"));
 
});

gulp.task("browser-sync", function() {
  browserSync.init({
    open: true,
    injectChanges:true,
    server: {
      baseDir: "./"
    }
  });
  gulp.watch(["./build/js/*.js", "./build/css/*.css"]).on("change", browserSync.reload);
});

gulp.task("default", gulp.parallel( "browser-sync","watch"));
