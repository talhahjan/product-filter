const sass = require('gulp-sass');
const autoprefixer = require('gulp-autoprefixer');
const livereload = require('gulp-livereload');
const sourcemaps = require('gulp-sourcemaps');

livereload.listen();

module.exports = function(gulp, options){
    return function(){
        return gulp.src(options.entries)
            .pipe(sourcemaps.init())
            .pipe(sass({outputStyle: 'compact'}).on('error', sass.logError))
            .pipe(autoprefixer('last 5 versions', '> 1%', 'ie 9', 'ie 8'))
            .pipe(sourcemaps.write('.'))
            .pipe(gulp.dest(options.dest))
            .pipe(livereload());
    }
};