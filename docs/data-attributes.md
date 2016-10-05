# HTML `data-attributes`

Add these [`data-attributes`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) to the HTML.

#### **required** `data-filter`

The container that wraps everything else

```html
<div data-filter>...</div>
```

#### **required** `data-filter-template`

Container for the [Handlebars](http://handlebarsjs.com) template

```html
<script data-filter-template type="text/x-handlebars-template"> ... </script>
```

#### **optional** `data-filter-rendered-template`

A container for the rendered html; will be inserted automatically if not provided.

May contain html [rendered on the server-side](#server-side-rendering).

```html
<div data-filter-rendered-template><!-- Initial HTML --></div>
```

#### **optional** `data-filter-form-toggle`

A button that toggles the `data-filter-form` element on small screens.

```html
<button data-filter-form-toggle>Show options</button>
```

#### **optional** `data-filter-tag`

Container for the tag-list.

```html
<div data-filter-tag-list> ... </div>
```

#### **optional** `data-filter-tag-remove`

A button that clears a filter.

Must contain `key` and `value`.

```html
<button data-filter-tag-remove='{"key": "color", "value": "red"}' type="button">Clear red</button>
```

#### **required** `data-filter-form`

A form with HTML form elements.

Works just like regular html forms.

When the user makes a change to an `<input />`, `<select></select>` or `<textarea></textarea>`, the form data is submitted to the api using an ajax request.

```html
<form data-filter-form>
{{#each response.facets}}
    <h2>{{label}}</h2>
    {{#each items}}
        <input id="{{../name}}-{{value}}" name="{{../name}}" value="{{value}}" type="checkbox" {{#if checked}}checked{{/if}} />
        <label for="{{../name}}-{{value}}">
            {{label}}
        </label>
    {{/each}}
{{/each}}
</form>
```

#### **optional** `data-filter-form-group`

A group of toggleable form elements

```html
<div data-filter-form-group> ... </div>
```

#### **optional** `data-filter-form-group-toggle`

A button for toggling a form group

```html
<button data-filter-form-group-toggle type="button">Show/hide colors</button>
```