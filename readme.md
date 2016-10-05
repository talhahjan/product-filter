# Geta product filter

A JavaScript plugin that connects to your API and renders a product filter with custom HTML.

**[Demo](https://geta.github.io/product-filter/)**

**Use this plugin if** you have a server-side api that returns search facets and products.<br />
Works with "any" `json`-api; the plugin itself doesn't expect the response to be in any particular format.

**Don't use this plugin if** you want't to use client-side filtering only.

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

## Server-side rendering 

This package does not provide methods for server-side rendering, but all you need is a server-side compiler for Handlebars.

That way you can use the same Handlebars template on both the client and the server (isomorphic rendering). 

**Advantages:** Faster initial rendering and improved SEO.

### .NET/Razor recipe

**1.** Install [Handlebars.Net](https://github.com/rexm/Handlebars.Net)

**2.** Create `template.hbs` with a Handlebars template

```handlebars
<div>{{response.count}} products</div>
```

**3.** Compile the template with some initial data

```cs
var handlebarsTemplate = File.ReadAllText("template.hbs");
var initialResponse = new { count = 100 }; // Should be identical to the response provided by your api
var renderedTemplateHtml = Handlebars.Compile(handlebarsTemplate)(new { response = initialResponse });
```

**4.** Render the template and the compiled output

```html
<div data-filter class="filter">
    <script data-filter-template type="text/x-handlebars-template">
        @Html.Raw(handlebarsTemplate)
    </script>
    <div data-filter-rendered-template>
        @Html.Raw(renderedTemplateHtml)
    </div>
</div>
```

**5.** Initialize the JavaScript

```JavaScript
var element = document.querySelector('[data-filter]');
var options = {};
var filter = new window.Filter(element, options);
```
