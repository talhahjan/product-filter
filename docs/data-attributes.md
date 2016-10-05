# HTML `data-attributes`

Add these [`data-attributes`](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Using_data_attributes) to the HTML.

## `data-filter` **required**

The container that wraps everything else

**Example:** `<div data-filter>...</div>`

## `data-filter-template` **required**

Container for the [Handlebars](http://handlebarsjs.com) template

**Example:** `<script data-filter-template type="text/x-handlebars-template"> ... </script>`

## `data-filter-rendered-template` **optional**

A container for the rendered html; will be inserted automatically if not provided.

May contain html [rendered on the server-side](#server-side-rendering).

**Example:** `<div data-filter-rendered-template><!-- Initial HTML --></div>`

## `data-filter-form-toggle` **optional**

A button that toggles the `data-filter-form` element on small screens.

**Example:** `<button data-filter-form-toggle>Show options</button>`

## `data-filter-tag` **optional**

Container for the tag-list.

**Example:** `<div data-filter-tag-list> ... </div>`

## `data-filter-tag-remove` **optional**

A button that clears a filter.

Must contain `key` and `value`.

**Example:** `<button data-filter-tag-remove='{"key": "color", "value": "red"}' type="button">Clear red</button>`

## `data-filter-form`

**required**

A form with HTML form elements.

Works just like regular html forms.

When the user makes a change to an `<input />`, `<select></select>` or `<textarea></textarea>`, the form data is submitted to the api using an ajax request.

**Example:**

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

## `data-filter-form-group` **optional**

A group of toggleable form elements

**Example:** `<div data-filter-form-group> ... </div>`

## `data-filter-form-group-toggle` **optional**

A button for toggling a form group

**Example:** `<button data-filter-form-group-toggle type="button">Show/hide colors</button>`