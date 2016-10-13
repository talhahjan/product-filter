# Server-side rendering 

This package does not provide methods for server-side rendering, but all you need is a server-side compiler for Handlebars.

That way you can use the same Handlebars template on both the client and the server (isomorphic rendering). 

**Advantages:** Faster initial rendering and improved SEO.

## .NET/Razor recipe

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