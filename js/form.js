const $ = require('jquery');
const FilterUtils = require('./utils');
const FormGroup = require('./form-group');

module.exports = class {

    static set active(value){
        this._active = value;
    }

    static get active(){
        return this._active;
    }

    static get defaults() {
        return {
            onLoad: function(){},
            onChange: function(data){}
        }
    }

    constructor(element, options){
        this.options = $.extend({}, this.constructor.defaults, options);
        this.element = element;
        this._xhr = null;
        this.element.addEventListener('change', this._onChange.bind(this));

        [...element.querySelectorAll('[data-filter-form-group]')].forEach(this._initGroup.bind(this));

        if(this.constructor.active){
            this.activate();
        }
    }

    _initGroup(element){
        new FormGroup(element);
    }

    _onChange(event){
        event.preventDefault();
        this.options.onChange(this._serialize());
    }

    _serialize(){
        var data = FilterUtils.serializeForm(this.element);
        data = FilterUtils.serializeObjectArrays(data);
        return data;
    }

    activate(){
        $(this.element).toggleClass('filter-form--active');
        this.constructor.active = true;
    }
}
