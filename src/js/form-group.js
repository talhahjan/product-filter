const $ = require('jquery');

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
        this.element.classList.remove(this.options.activeClass);
        this.constructor.deactivateId(this._id);
    }

    show(){
        this.element.classList.add(this.options.activeClass);
        var activeElements = [...document.querySelectorAll('.' + this.options.activeClass)].filter(el => el != this.element);
        if(this._getLayoutType() == 'tabs' && activeElements.length){
            this.constructor._active = [];
            activeElements.forEach(el => el.classList.remove(this.options.activeClass));
        }
        this.constructor.activateId(this._id);
    }

    _getLayoutType(){
        return window.getComputedStyle(this.element, ':before')
            .getPropertyValue('content')
            .replace(/"/g, '')
            .replace(/'/g, '');
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