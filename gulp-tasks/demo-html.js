const fs = require('fs');
const handlebars = require('gulp-compile-handlebars');
const rename = require('gulp-rename');
const sourceDirectory = 'src/demo/full';
const destDirectory = '.';

function removeNewlines(string){
    return string.replace(/(\r\n|\n|\r)/gm, '');
}

function removeDoubleWhitespace(string){
    return string.replace(/\s{2,}/g, ' ');
}

module.exports = function(gulp){
    return function(){
        var json = fs.readFileSync(`${sourceDirectory}/index.json`, 'utf-8');
        json = removeNewlines(json);
        json = removeDoubleWhitespace(json);
        var template = fs.readFileSync(`${sourceDirectory}/template.hbs`, 'utf-8');
        return gulp.src(`${sourceDirectory}/index.hbs`)
            .pipe(handlebars(
                {
                    sourceDirectory: `${sourceDirectory}`,
                    jsonUrl: `${sourceDirectory}/index.json`,
                    json: json,
                    template: template
                },
                {
                    batch : [sourceDirectory]
                }
            ))
            .pipe(rename('index.html'))
            .pipe(gulp.dest(destDirectory));
    };
};

