const $ = require('jquery');
const FilterUtils = require('./utils');

module.exports = class {

    static get defaults() {
        return {
            onChange: function(){}
        }
    }

    constructor(options){
        this.options = $.extend({}, this.constructor.defaults, options);
        window.addEventListener('popstate', this.options.onChange);
    }

    update(data){
        var string = FilterUtils.serializeString(data);
        window.history.pushState({}, '', '?'+string);
        this.options.onChange();
    }

    static parameterHasValue(name, value){
        var urlValue = this.parameter(name);
        var valueArray = urlValue ? urlValue.split(',') : [];
        return valueArray.indexOf(value) !== -1;
    }

    static parameter(name){
        var url = window.location.href;
        name = name.replace(/[\[\]]/g, "\\$&");
        var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)");
        var results = regex.exec(url);
        if (!results) return null;
        if (!results[2]) return '';
        return decodeURIComponent(results[2].replace(/\+/g, " "));
    }

	static parameterStringToObject(parametersFromUrl){
        var output = {};
        if(parametersFromUrl.trim() == ''){
            return output;
        }
        var attributes = parametersFromUrl.replace(/(^\?)/,'').split('&');
		for(var i=0; i < attributes.length; i++){
			var items = attributes[i].split('=');
            var key = items[0];
            var value = items[1];
			var valueSplit = decodeURIComponent(value).split(",");
			var tempSub = [];
			for(var counter=0; counter < valueSplit.length; counter++){
				tempSub[counter] = valueSplit[counter];
			}
			value = tempSub;
			output[key] = value;

		}
        return output;
    }

}