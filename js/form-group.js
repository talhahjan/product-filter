const $ = require('jquery');
const FilterFormCheckbox = require('./form-checkbox');
const FilterFormRange = require('./form-range');

var instances = [];

module.exports = class {

    static get defaults() {
        return {
            activeClass: 'filter-form-item--active'
        }
    }

    constructor(element, options){
        this.options = $.extend({}, this.constructor.defaults, options);
        this.element = element;
        this._id = this.element.getAttribute('data-filter-form-group');
        this.button = this.element.querySelector('[data-filter-form-group-toggle]');
        this.button.addEventListener('click', this._toggle.bind(this));
        if(this.constructor.isActive(this._id)){
            this.show();
        }
        else {
            this.hide();
        }
    }

    _toggle(event){
        event.preventDefault();
        if(this.constructor.isActive(this._id)){
            this.hide();
        }
        else {
            this.show();
        }
    }

    hide(){
        $(this.element).removeClass(this.options.activeClass);
        this.constructor.deactivateId(this._id);
    }

    show(){
        $(this.element).addClass(this.options.activeClass);
        if(this._getLayoutType() == 'tabs'){
            this.constructor._active = [];
            $('.' + this.options.activeClass)
                .not(this.element)
                .removeClass(this.options.activeClass);
        }
        this.constructor.activateId(this._id);
    }

    _getLayoutType(){
        return window.getComputedStyle(this.element, ':before')
            .getPropertyValue('content')
            .replace(/"/g, '')
            .replace(/'/g, '');
    }

    render(options){
        this.options = $.extend({}, this.options, options);
        this._setButtonState();
        switch(this.options.type){
            case 'checkbox':
                this._renderCheckbox();
                break;
            case 'range':
                this._renderRange();
                break;
            default:
                throw new Error('Type must be checkbox or range');
        }
    }

    _renderCheckbox(){
        var containerElement = this.element.querySelector('[data-filter-form-item-options]');
        containerElement.innerHTML = '';
        var checkboxElements = this.options.items.map(item => new FilterFormCheckbox(item));
        checkboxElements.forEach(item => containerElement.appendChild(item.element));
    }

    _renderRange(){
        if(this.options.items.length === 1) {
            var containerElement = this.element.querySelector('[data-filter-form-item-options]');
            containerElement.innerHTML = '';
            var range = new FilterFormRange(this.options.items[0]);
            containerElement.appendChild(range.element)
        }
    }

    _setButtonState(){
        if(!this.options.items.length){
            this.button.setAttribute('disabled', true);
        }
        else {
            this.button.removeAttribute('disabled');
        }
    }

    _arrayValuesAreEqual(array, property){
        var firstValue = array[0];
        for(var i=1; i<array.length; i++){
            if(array[i][property] != firstValue[property]){
                return false;
            }
        }
        return true;
    }

    static activateId(id){
        this._active = this._active || [];
        var index = this._active.indexOf(id);
        if(index === -1){
            this._active.push(id);
        }
    }

    static deactivateId(id){
        this._active = this._active || [];
        var index = this._active.indexOf(id);
        if(index !== -1){
            this._active.splice(index, 1);
        }
    }

    static isActive(id) {
        this._active = this._active || [];
        return this._active.indexOf(id) !== -1;
    }

    static getOrCreate(options){
        var item = instances.filter(instance => instance.options.id === options.id && options.type == 'range').pop();
        if(!item){
            item = new this(options);
            instances.push(item);
        }
        return item;
    }
};