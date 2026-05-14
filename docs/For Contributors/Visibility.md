# Managing Visibility

## Visibility Logic

Visibility is managed using a data attribute named `data-visible`. It should be used like this:

```html
<div data-visible="true">
  Content
</div>
```

Then, in CSS, define the rules that determine how the element should be hidden:

```css
div[data-visible="false"] {
  display: none;
}
```

Keep in mind that theme uses sass though therefore it is reccomended to use this:

```
div {
  *[data-visible="false"] {
    display: none;
  }
}
```

## Changing Visibility

If an event on an element changes visibility, the element should define the following data attributes:

* `aria-controls`: A data attribute containing the CSS selector of the element 
* `aria-expanded`: That stored whether the control element has expanded or not.

```html
<button role="button" aria-controls="sidebar">Toggle</button>
```

The same concept applies if another input element controls visibility:

```html
<input type="radio" id="visible" name="visibility" value="true" aria-controls="sidebar">
<label for="visible">VISIBLE</label><br>

<input type="radio" id="hidden" name="visibility" value="false" aria-controls="sidebar">
<label for="hidden">HIDDEN</label><br>
```

The logic works as follows:

1. Use the CSS selector provided in `aria-controls` to fetch the target element.
2. Set the `data-visible` attribute on that element to either `true` or `false`.
3. CSS determines how the element is hidden based on this attribute.
4. If the element becomes hidden, set `data-element-hidden="true"` upon the control element. Otherwise, it should be `false`.

Keep in mind that upon `aria-controls` the id does not start with `#` as used in css selector upon Javascript.
