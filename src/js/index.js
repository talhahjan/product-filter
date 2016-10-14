require('classlist-polyfill');
const $ = require('jquery');
const Form = require('./form');
const Ajax = require('./ajax');
const Url = require('./url');
const Tag = require('./tag');
const ToggleButton = require('./toggle-button');
const Template = require('./template');

window.Filter = class {

    static get defaults() {
        return {
            url: '',
            initialResponse: null,
            ajaxOptions: {},
            transformRequest: data => data,
            transformUrl: data => data,
            transformTemplateData: data => data,
            rendered: element => {},
            loaderClass: 'filter--loading'
        }
    }

    static get Url(){
        return Url;
    }

    constructor(element, options){
        this.element = element;
        this.options = $.extend({}, this.constructor.defaults, options);
        this._content = this._createContentElement();
        this._renderInitialResponse();
        this._url = new Url({onChange: this.ajax.bind(this)});
    }

    _createContentElement(){
        var element = this.element.querySelector('[data-filter-rendered-template]');
        if(!element){
            element = document.createElement('div');
            element.setAttribute('data-filter-rendered-template', '');
            this.element.appendChild(element);
        }
        return element;
    }

    _renderInitialResponse(){
        var response = this.options.initialResponse;
        response && this._renderResponse(response);
    }

    ajax(){
        var url = this.options.url;
        var data = decodeURI(location.search.replace('?', ''));
        data = Url.parameterStringToObject(data);
        var ajaxOptions = this.options.ajaxOptions;
        var transformRequest = this.options.transformRequest;
        this.element.classList.add(this.options.loaderClass);
        Ajax.get(url, data, ajaxOptions, transformRequest)
            .then(this._renderResponse.bind(this))
            .catch(this._renderError.bind(this))
            .always(() => this.element.classList.remove(this.options.loaderClass));
    }

    _renderResponse(response){
        this._renderTemplate(response);

        this._initPlugin(Tag, '[data-filter-tag]', {
            onRemove: this._removeFromUrl.bind(this)
        });

        var form = this._initPlugin(Form, '[data-filter-form]', {
            url: this.options.url,
            onLoad: () => {},
            onChange: (data) => this._updateUrl(data)
        });

        this._initPlugin(ToggleButton, '[data-filter-form-toggle]', {
            onClick: () => {
                form && form.activate();
            }
        });

        this.options.rendered(this._content);
    }

    _initPlugin(Class, selector, options){
        var element = this._content.querySelector(selector);
        return element ? new Class(element, options) : null;
    }

    _renderError(error){
        if(error.statusText != 'abort'){
            this._renderTemplate(null, error);
        }
    }

    _renderTemplate(response, error = null){
        var element = this._content;
        var templateElement = this.element.querySelector('[data-filter-template]');
        var templateData = this.options.transformTemplateData({
            response: response,
            error: error,
            urlParameters: this._getUrlData()
        });
        element.innerHTML = Template.elementToString(templateElement, templateData);
    }

    _getUrlData(){
        var decoded = decodeURI(location.search.replace('?', ''));
        return Url.parameterStringToObject(decoded);
    }

	_removeFromUrl(mainKey, value){
		var urlData = this._getUrlData();
        if(!urlData[mainKey]){
            return;
        }
		var i = urlData[mainKey].indexOf(value);
		if(i != -1) {
            urlData[mainKey].splice(i, 1);
        }

		// Delete the mainkey if the value remaining is zero
		if(urlData[mainKey].length == 0){
			delete urlData[mainKey];
		}

		this._updateUrl(urlData);
	}

    navigate(parameters){
        var urlData = this._getUrlData();
        for(var parameter in parameters){
            if(!parameters[parameter]){
                delete urlData[parameter];
                delete parameters[parameter];
            }
        }
        var data = $.extend({}, urlData, parameters);
        this._updateUrl(data);
    }

    _updateUrl(data){
        data = this.options.transformUrl(data);
        this._url.update(data);
    }
};

