# OBSOLETE! DO NOT USE

# Geta product filter

A JavaScript plugin that connects to your API and renders a product filter with custom HTML.

**Use this plugin if** you have a server-side api that returns search facets and products.<br />
Works with "any" `json`-api; the plugin itself doesn't expect the response to be in any particular format.

**Don't use this plugin if** you want't to use client-side filtering without a server-side api.

---

* **[Demo](https://geta.github.io/product-filter/)**
* **[Server-side-rendering](docs/server-side-rendering.md)**
* **[Contribution (for Geta)](docs/contribution.md)**

---

## Getting started

### Install from NPM

    npm install geta-product-filter --save
    
### Include CSS and JavaScript

```html
<link rel="stylesheet" href="node_modules/geta-product-filter/dist/index.css">
<script src="node_modules/geta-product-filter/dist/index.js"></script>
```

### Write a HTML template

Use [Handlebars](http://handlebarsjs.com/) to render data from an api

```handlebars
<div data-filter class="filter">
    <script data-filter-template type="text/x-handlebars-template">
        <div class="filter-form-counter">
			{{response.products.length}} products
		</div>
    </script>
</div>
```

See [an example of a template](src/demo/full/template.hbs)  that renders html from [a json response](src/demo/full/index.json).

See a [complete list of html data-attributes](docs/data-attributes.md) that should be included in the template.

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

Alternatively, use [server-side-rendering](#server-side-rendering).

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

## Methods

### navigate(`Object`)

Performs a new search and updates the url an ui.

Useful for updating the url and ui manually, e.g. when clicking an external button.
 
**Example 1:** request all red products

```JavaScript
var filter = new window.Filter(element, options);
filter.navigate({color: 'red'});
```

**Example 2:** request all red and blue products that belong to *My Brand*

```JavaScript
var filter = new window.Filter(element, options);
filter.navigate({color: ['red', 'blue'], brand: 'My Brand'})
```
