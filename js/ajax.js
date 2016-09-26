const $ = require('jquery');
const Url = require('./url');

module.exports = class {
    static get(url, data, options = {}, transformRequest = (data) => data){
        this._xhr && this._xhr.readyState != 4 && this._xhr.abort();
        options = $.extend(
            {},
            {
                url: url,
                data: transformRequest(data)
            },
            options
        );
        this._xhr = $.ajax(options);
        return this._xhr;
    }
};