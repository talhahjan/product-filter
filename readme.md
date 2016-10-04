# Geta product filter

A JavaScript plugin that connects to your API and renders a product filter with custom HTML.

**[Demo](https://geta.github.io/product-filter/)**

* Does not rely on a framework such as React or Angular
* Works with "any" `JSON`-API

## Getting started

### Install from NPM

    npm install geta-product-filter --save
    
### Include CSS and JavaScript

```html
<link rel="stylesheet" href="node_modules/geta-product-filter/dist/index.css">
<script src="node_modules/geta-product-filter/dist/index.js"></script>
```

### Write a HTML template

Use [Handlebars](http://handlebarsjs.com/) to render properties from json.

```handlebars
<div data-filter class="filter">
    <script data-filter-template type="text/x-handlebars-template">
        <div class="filter-form-counter">
			{{response.products.length}} products
		</div>
    </script>
</div>
```

See [an example of a template](index.html)  that renders html from [a json response](demo/full/index.json).

#### HTML `data-attributes`

Add these `data-attributes` to the HTML:

**`data-filter`**: The container that holds the template and rendered HTML

**`data-filter-template`**: The Handlebars template

**`data-filter-rendered-template`**: A container for the rendered html; will be inserted automatically if not provided

**`data-filter-form-toggle`**: A button that toggles the form on small screens

**`data-filter-tag`**: Container for the tag-list

**`data-filter-tag-remove='{"key": "color", "value": "red"}'`**: A button that clears a filter.

**`data-filter-form`**: The form that will be submitted to the API

**`data-filter-form-group`**: A group of toggleable form elements

**`data-filter-form-group-toggle`**: A button for toggling a form group

### Initialize the JavaScript

```JavaScript
var element = document.querySelector('[data-filter]');
var options = {};
var filter = new window.Filter(element, options);
```

## Options

### url

`string`, **required**

An api endpoint that returns json with form facets and a list of products

### ajaxOptions

`object`, **optional**

Options to be passed to [jQuery Ajax](http://api.jquery.com/jquery.ajax/)

### initialResponse

`object`, **optional**

An object with a response from the api.
Use this to avoid having to call the api asynchronously after the JavaScript has initialized.
Improves performance and SEO.

### transformRequest

`function`, **optional**

A function that converts parameters before they are sent back to the api.

### transformUrl

`function`, **optional**

A function that converts parameters before they are displayed in the url

### transformTemplateData

`function`, **optional**

Transform the json from the api before rendering the template.

### rendered

`function`, **optional**

A callback that runs every time the html template has rendered.

Use this for accessing the dom.
 
```JavaScript
new window.Filter(element, {
    ...
    rendered: function(element){
        console.log(element); // An element that contains the rendered template html
    }
});
```

### loaderClass

`string`, **optional**

A css class that will be added to the container element whenever an ajax request is in progress.

Default: `filter--loading`

### Json response

Your api must return `json` with properties that can be read by the html template.

See [an example](demo/full/index.json)

