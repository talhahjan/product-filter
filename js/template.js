const Handlebars = require('handlebars');

module.exports = class {

    static elementToString(element, data){
        var source = element.innerHTML;
        var template = Handlebars.compile(source);
        return template(data);
    }

};