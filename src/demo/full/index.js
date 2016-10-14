window.Demo = class {

    // Hard-coded search facets.
    // You don't have to hard-code these if your API returns dynamic facets.
    // See the _transformTemplateData function.

    static get searchFacets() {
        return [
            {
                label: 'Subject',
                name: 'subject',
                removable: false,
                items: [
                    {
                        label: 'JavaScript',
                        value: 'JavaScript',

                        // Make "JavaScript" the default subject if the url doesn't have a subject-parameter.

                        checked: !Filter.Url.parameter('subject') || Filter.Url.parameterHasValue('subject', 'JavaScript')
                    },
                    {
                        label: 'jQuery',
                        value: 'jQuery',
                        checked: Filter.Url.parameterHasValue('subject', 'jQuery')
                    },
                    {
                        label: 'CSS',
                        value: 'CSS',
                        checked: Filter.Url.parameterHasValue('subject', 'CSS')
                    }
                ]
            },
            {
                label: 'Publisher',
                name: 'inpublisher',
                removable: true,
                items: [
                    {
                        label: 'O\'Reilly',
                        value: 'O\'Reilly',
                        checked: Filter.Url.parameterHasValue('inpublisher', 'O\'Reilly')
                    },
                    {
                        label: 'No Starch Press',
                        value: 'No Starch Press',
                        checked: Filter.Url.parameterHasValue('inpublisher', 'No Starch Press')
                    },
                    {
                        label: 'John Wiley & Sons',
                        value: 'John Wiley & Sons',
                        checked: Filter.Url.parameterHasValue('inpublisher', 'John Wiley & Sons')
                    }
                ]
            }
        ]
    }

    // The initial response will be used for initializing the filter synchronously.
    // This improves performance as we don't have to wait for an ajax reponse to complete after page load.

    constructor(element, initialResponse){
        this.element = element;
        this._initFilter(initialResponse);
    }

    // Initialize the plugin

    _initFilter(initialResponse){

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

    _transformRequest(formData){
        var serializedForm = [];
        for(var key in formData){
            var serializedFormItem = this._getSerializedFormItem(key, formData[key]);
            serializedForm.push(serializedFormItem);
        }
        return 'q=' + serializedForm.join('+') + '&maxResults=12';
    }

    _getSerializedFormItem(key, values){
        var firstValue = values && values[0];
        if(firstValue){
            var decodedKey = decodeURIComponent(key);
            return decodedKey + ':' + firstValue;
        }
    }

    // Transform the appearance of the browser's url

    _transformUrl(response){
        return response;
    }

    // The data argument is passed on to the handlebars template with the following information:
    // - The response from the API request
    // - An error if the API request failed
    // - The browser's url parameters

    _transformTemplateData(data){
        if(!data.error){
            data.searchFacets = this.constructor.searchFacets;
        }
        return data;
    }

    // Do something with the dom

    _rendered(element){
        console.log('Element with rendered template:', element);
        document.querySelector('[data-external-message]').style.display = 'block';
    }

}


