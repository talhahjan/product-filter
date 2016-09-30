const $ = require('jquery');
const FilterForm = require('./form');
const Ajax = require('./ajax');
const Url = require('./url');
const Tag = require('./tag');
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
        var element = document.createElement('div');
        this.element.appendChild(element);
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
        $(this.element).addClass(this.options.loaderClass);
        var a = Ajax.get(url, data, ajaxOptions, transformRequest)
            .then(this._renderResponse.bind(this))
            .catch(this._renderError.bind(this))
            .always(() => $(this.element).removeClass(this.options.loaderClass));
    }

    _renderResponse(response){
        this._renderTemplate(response);

        var tag = new Tag(
            this._content.querySelector('[data-filter-tag]'),
            {
                onRemove: this._removeFromUrl.bind(this)
            }
        );

        var form = new FilterForm(
            this._content.querySelector('[data-filter-form]'),
            {
                url: this.options.url,
                onLoad: () => {},
                onChange: (data) => this._updateUrl(data)
            }
        );

        this.element.querySelector('[data-filter-form-toggle]')
            .addEventListener('click', form.activate.bind(form));

        this.options.rendered(this._content);
    }

    _renderError(error){
        this._renderTemplate(null, error);
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
        var data = $.extend({}, this._getUrlData(), parameters);
        this._updateUrl(data);
    }

    _updateUrl(data){
        data = this.options.transformUrl(data);
        this._url.update(data);
    }
};

