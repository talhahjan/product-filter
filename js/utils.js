const $ = require('jquery');

module.exports = class {

    static serializeForm(el){
        var array = $(el).serializeArray();
        var serialized = {};
        for(var i=0; i<array.length; i++) {
            var item = array[i];
            serialized[item.name] = serialized[item.name] || [];
            serialized[item.name].push(item.value);
        }
        return serialized;
    }

    static serializeObjectArrays(object){
        var clone = $.extend({}, object, {});
        for(var name in clone){
            if(clone.hasOwnProperty(name)){
                var valueArray = clone[name];
                clone[name] = valueArray.join(',');
            }
        }
        return clone;
    }

    static serializeString(object){
        for(var key in object){
            var value = object[key];
            if(Array.isArray(value)){
                object[key] = value.join(',');
            }
        }
        return $.param(object, true);
    }

    static getUniqueId(){
        this._uniqueId = this._uniqueId === undefined ? 0 : this._uniqueId+1;
        return this._uniqueId;
    }
}
