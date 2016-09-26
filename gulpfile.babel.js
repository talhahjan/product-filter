const gulp = require('gulp');

gulp.task('demo-html', require('./gulp-tasks/demo-html')(gulp));

gulp.task('js', require('./gulp-tasks/js')(gulp, {
    entries: 'js/index.js',
    filename: 'index.js',
    dest: 'dist'
}));

gulp.task('css', require('./gulp-tasks/css')(gulp, {
    entries: 'css/index.scss',
    dest: 'dist'
}));

gulp.task('watch', function(){
    gulp.watch(['demo/**/*.*'], ['demo-html']);
    gulp.watch(['js/**/*.js'], ['js']);
    gulp.watch(['css/**/*.scss'], ['css']);
});

gulp.task('connect', require('./gulp-tasks/connect')(gulp));

gulp.task('default', ['demo-html', 'js', 'css', 'watch', 'connect']);
