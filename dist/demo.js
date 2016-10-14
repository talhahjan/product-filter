(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

window.Demo = function () {
    _createClass(_class, null, [{
        key: 'searchFacets',


        // Hard-coded search facets.
        // You don't have to hard-code these if your API returns dynamic facets.
        // See the _transformTemplateData function.

        get: function get() {
            return [{
                label: 'Subject',
                name: 'subject',
                removable: false,
                items: [{
                    label: 'JavaScript',
                    value: 'JavaScript',

                    // Make "JavaScript" the default subject if the url doesn't have a subject-parameter.

                    checked: !Filter.Url.parameter('subject') || Filter.Url.parameterHasValue('subject', 'JavaScript')
                }, {
                    label: 'jQuery',
                    value: 'jQuery',
                    checked: Filter.Url.parameterHasValue('subject', 'jQuery')
                }, {
                    label: 'CSS',
                    value: 'CSS',
                    checked: Filter.Url.parameterHasValue('subject', 'CSS')
                }]
            }, {
                label: 'Publisher',
                name: 'inpublisher',
                removable: true,
                items: [{
                    label: 'O\'Reilly',
                    value: 'O\'Reilly',
                    checked: Filter.Url.parameterHasValue('inpublisher', 'O\'Reilly')
                }, {
                    label: 'No Starch Press',
                    value: 'No Starch Press',
                    checked: Filter.Url.parameterHasValue('inpublisher', 'No Starch Press')
                }, {
                    label: 'John Wiley & Sons',
                    value: 'John Wiley & Sons',
                    checked: Filter.Url.parameterHasValue('inpublisher', 'John Wiley & Sons')
                }]
            }];
        }

        // The initial response will be used for initializing the filter synchronously.
        // This improves performance as we don't have to wait for an ajax reponse to complete after page load.

    }]);

    function _class(element, initialResponse) {
        _classCallCheck(this, _class);

        this.element = element;
        this._initFilter(initialResponse);
    }

    // Initialize the plugin

    _createClass(_class, [{
        key: '_initFilter',
        value: function _initFilter(initialResponse) {

            window.filter = new Filter(this.element, {

                // The url to your API

                url: 'https://www.googleapis.com/books/v1/volumes',

                // The initial response; should be the same as the data returned by the url

                initialResponse: initialResponse,

                // Transform ajax requests to the format expected by the API

                transformRequest: this._transformRequest.bind(this),

                // Transform the browser url if needed

                transformUrl: this._transformUrl.bind(this),

                // Transform data to the format expected by your custom handlebars template

                transformTemplateData: this._transformTemplateData.bind(this),

                // A callback that runs every time the template has been rendered.
                // Useful for manipulating DOM inside the rendered template element.

                rendered: this._rendered.bind(this)
            });
        }

        // The formData argument has data from the template's <form> element.
        // Generates a request that matches the specifications described on https://developers.google.com/books/docs/v1/reference/volumes/list

    }, {
        key: '_transformRequest',
        value: function _transformRequest(formData) {
            var serializedForm = [];
            for (var key in formData) {
                var serializedFormItem = this._getSerializedFormItem(key, formData[key]);
                serializedForm.push(serializedFormItem);
            }
            return 'q=' + serializedForm.join('+') + '&maxResults=12';
        }
    }, {
        key: '_getSerializedFormItem',
        value: function _getSerializedFormItem(key, values) {
            var firstValue = values && values[0];
            if (firstValue) {
                var decodedKey = decodeURIComponent(key);
                return decodedKey + ':' + firstValue;
            }
        }

        // Transform the appearance of the browser's url

    }, {
        key: '_transformUrl',
        value: function _transformUrl(response) {
            return response;
        }

        // The data argument is passed on to the handlebars template with the following information:
        // - The response from the API request
        // - An error if the API request failed
        // - The browser's url parameters

    }, {
        key: '_transformTemplateData',
        value: function _transformTemplateData(data) {
            if (!data.error) {
                data.searchFacets = this.constructor.searchFacets;
            }
            return data;
        }

        // Do something with the dom

    }, {
        key: '_rendered',
        value: function _rendered(element) {
            console.log('Element with rendered template:', element);
            document.querySelector('[data-external-message]').style.display = 'block';
        }
    }]);

    return _class;
}();

},{}]},{},[1])


//# sourceMappingURL=demo.js.map
