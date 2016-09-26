const fs = require('fs');

const sourceDirectory = './demo';

const distDirectory = '.';

class Demo {
    constructor(directoryName){
        this.directoryName = directoryName;
        this.path = sourceDirectory + '/' + this.directoryName;
        this.fixtures = fs.readdirSync(this.path)
            .filter(this.constructor._extIsJson)
            .map(this._getContents.bind(this));
        this.template = this._getContents('template.html');
        this.items = this.fixtures.map(this._getItem.bind(this));
    }

    _getContents(fileName){
        return {
            name: fileName,
            contents: fs.readFileSync(this.path + '/' + fileName, 'utf-8')
        }
    }

    _getItem(fixture){
        var json = fixture.contents;
        json = this.constructor._removeNewlines(json);
        json = this.constructor._removeDoubleWhitespace(json);
        return {
            name: fixture.name,
            contents: this.template.contents
                .replace('{json}', json)
                .replace('{jsonUrl}', '.' + this.path + '/' + fixture.name)
        }
    }

    static _removeNewlines(string){
        return string.replace(/(\r\n|\n|\r)/gm, '');
    }

    static _removeDoubleWhitespace(string){
        return string.replace(/\s{2,}/g, ' ');
    }

    static _extIsJson(name){
        return name.split('.').pop() == 'json';
    }
}

module.exports = function(gulp, options){
    return function(){
        fs.readdirSync(sourceDirectory)
            .map(directoryName => new Demo(directoryName))
            .forEach(demo => {
                demo.items.forEach(item => {
                    //var name = demo.directoryName + '-' + item.name.replace('.json', '.html');
                    var name = 'index.html';
                    fs.writeFileSync(distDirectory + '/' + name, item.contents);
                });
            });
    };
};


