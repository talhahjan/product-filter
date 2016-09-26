const $ = require('jquery');
global.jQuery = $;
require('ion-rangeslider');
const FilterUtils = require('./utils');

module.exports = class {

    static get defaults() {
        return {
            min: 0,
            max: 0,
            value: {
                from: null,
                to: null
            },
            step: 1,
            name: null,
            valueSeparator: '_',
            template: function(options){
                var fromId = 'id-' + (FilterUtils.getUniqueId());
                var toId = 'id-' + (FilterUtils.getUniqueId());
                return `
                    <div class="filter-form-range">
                        <div class="filter-form-range-texts">
                            <div class="filter-form-range-text">
                                <label for="${fromId}">
                                    From
                                </label>
                                <input id="${fromId}" type="number" value="${options.min}" data-filter-form-range-from />
                            </div>
                            <div class="filter-form-range-text">
                                <label for="${toId}">
                                    To
                                </label>
                                <input id="${toId}" type="number" value="${options.max}" data-filter-form-range-to />
                            </div>
                        </div>
                        <div>
                            <input data-form-range-range-input type="text" />
                            <input data-form-range-value-input type="text" name="${options.name}" style="position: absolute; visibility: hidden" disabled />
                        </div>
                    </div>
                `;
            }
        }
    }

    constructor(options){
        this.options = $.extend({}, this.constructor.defaults, options);
        this.options = this._normalizeOptions();
        this.element = this._createElement();
        this._fromInput = this.element.querySelector('[data-filter-form-range-from]');
        this._toInput = this.element.querySelector('[data-filter-form-range-to]');
        this._rangeInput = this.element.querySelector('[data-form-range-range-input]');
        this._valueInput = this.element.querySelector('[data-form-range-value-input]');
        this._initNumericInput(this._fromInput, 'from');
        this._initNumericInput(this._toInput, 'to');
        this._initRangeInput(this._rangeInput);
    }

    _initNumericInput(input, parameter){
        input.setAttribute('min', this.options.min);
        input.setAttribute('max', this.options.max);
        input.setAttribute('step', this.options.step);
        input.addEventListener('change', this._onNumericChange.bind(this, parameter));
    }

    _initRangeInput(input){
        this._range = $(input).ionRangeSlider(this.options).data('ionRangeSlider');
    }

    _normalizeOptions(){
        var options = $.extend(
            {},
            this.options,
            {
                type: 'double',
                min: Math.floor(this.options.min/100)*100,
                max: Math.ceil(this.options.max/100)*100,
                from: this.options.value.from,
                to: this.options.value.to,
                step: 100,
                grid: false,
                onFinish: this._onRangeChange.bind(this),
                onUpdate: this._onRangeChange.bind(this)
            });
        options.step = Math.max((options.max - options.min) / 10, 10);
        return options;
    }

    _onNumericChange(parameter, event){
        var object = {};
        object[parameter] = event.target.value;
        this._range.update(object);
    }

    _onRangeChange(object){
        this._fromInput.value = object.from;
        this._toInput.value = object.to;
        this._valueInput.removeAttribute('disabled');
        this._valueInput.value = object.from + this.options.valueSeparator + object.to;
        var event = new Event('change');
        this._valueInput.form.dispatchEvent(event);
    }

    _createElement(){
        var element = document.createElement('div');
        element.innerHTML = this.options.template(this.options);
        return element.firstElementChild;
    }
}