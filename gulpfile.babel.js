const gulp = require('gulp');

gulp.task('js', require('./gulp-tasks/js')(gulp, {
    entries: 'src/js/index.js',
    filename: 'index.js',
    dest: 'dist'
}));

gulp.task('css', require('./gulp-tasks/css')(gulp, {
    entries: 'src/css/index.scss',
    dest: 'dist'
}));

gulp.task('demo-html', require('./gulp-tasks/demo-html')(gulp));

gulp.task('demo-js', require('./gulp-tasks/js')(gulp, {
    entries: 'src/demo/full/index.js',
    filename: 'demo.js',
    dest: 'dist'
}));

gulp.task('watch', function(){
    gulp.watch(['src/js/**/*.js'], ['js']);
    gulp.watch(['src/css/**/*.scss'], ['css']);
    gulp.watch(['src/demo/**/*.hbs', 'src/demo/**/*.json'], ['demo-html']);
    gulp.watch(['src/demo/**/*.js'], ['demo-js']);
});

gulp.task('connect', require('./gulp-tasks/connect')(gulp));

gulp.task('default', ['demo-html', 'js', 'css', 'demo-js', 'watch', 'connect']);
