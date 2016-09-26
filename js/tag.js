const $ = require('jquery');
const FilterUtils = require('./utils');

module.exports = class {

    static get defaults() {
        return {
			onRemove: function(parameterName, value){}
		}
    }

    constructor(element, options){
        this.options = $.extend({}, this.constructor.defaults, options);
		[...element.querySelectorAll('[data-filter-tag-remove]')].forEach(this._initButton.bind(this));
    }

	_initButton(element){
		element.addEventListener('click', this._onRemove.bind(this));
	}

	_onRemove(event){
		event.preventDefault();
		var data = $(event.currentTarget).data('filter-tag-remove');
		var parameterName = data.key;
		var value = data.value;
		this.options.onRemove(parameterName, value);
	}

	_renderItem(value){
		// Reaplce underscore for the viewing name, looks better.
		value = value.replace("_", "-");
	}
}
