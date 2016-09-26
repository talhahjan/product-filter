var browserify = require('browserify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var babelify = require('babelify');
var sourcemaps = require('gulp-sourcemaps');
var gutil = require('gulp-util');

module.exports = function(gulp, options){
    return function(){
        return browserify({
            entries: options.entries,
            debug: true,
            transform: [babelify]
        })
        .bundle()
        .on('error', function(err) {
            console.error(err);
            this.emit('end');
        })
        .pipe(source(options.filename))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .on('error', gutil.log)
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest(options.dest));
    };
};