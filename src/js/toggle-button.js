const $ = require('jquery');

module.exports = class {

    static get defaults() {
        return {
            onClick: event => {}
        }
    }

    constructor(element, options){
        this.options = $.extend({}, this.constructor.defaults, options);
        element.addEventListener('click', this.options.onClick);
    }
}
