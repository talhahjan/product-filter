var connect = require('gulp-connect');

module.exports = function(gulp){
    return function(){
        return gulp.task('connect', function() {
            connect.server({
                root: './',
                port: '4000',
                livereload: true
            });
        });
    };
};