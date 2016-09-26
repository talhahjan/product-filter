const $ = require('jquery');
const FilterUtils = require('./utils');

module.exports = class {

    static get defaults() {
        return {
            label: '',
            value: '',
            name: null,
            selected: false,
            template: function(options){
                var id = 'id-' + (FilterUtils.getUniqueId());
                var checked = options.selected ? 'checked="checked"' : '';
                return `
                    <div class="filter-form-checkbox">
                        <input id="${id}" name="${options.name}" value="${options.value}" type="checkbox" ${checked} />
                        <label for="${id}">${options.label}</label>
                    </div>
                `;
            }
        }
    }

    constructor(options){
        this.options = $.extend({}, this.constructor.defaults, options);
        this.element = this._createElement();
    }

    _createElement(){
        var element = document.createElement('div');
        element.innerHTML = this.options.template(this.options);
        return element.firstElementChild;
    }
}