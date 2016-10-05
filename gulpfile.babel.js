const gulp = require('gulp');

gulp.task('demo-html', require('./gulp-tasks/demo-html')(gulp));

gulp.task('js', require('./gulp-tasks/js')(gulp, {
    entries: 'src/js/index.js',
    filename: 'index.js',
    dest: 'dist'
}));

gulp.task('css', require('./gulp-tasks/css')(gulp, {
    entries: 'src/css/index.scss',
    dest: 'dist'
}));

gulp.task('watch', function(){
    gulp.watch(['src/demo/**/*.*'], ['demo-html']);
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/css/**/*.scss'], ['css']);
});

gulp.task('connect', require('./gulp-tasks/connect')(gulp));

gulp.task('default', ['demo-html', 'js', 'css', 'watch', 'connect']);
