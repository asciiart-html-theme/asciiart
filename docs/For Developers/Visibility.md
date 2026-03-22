# Visibility

In case you want a button to manage a visibility you need to follow these steps:

## Ensure Js is included

```
<script src="./dist/main.js"></script>
```

## Create a button:

The `data-control-element` contains the css selector of the element which needs to hjav e its vbisibility managed.

These js functions manage visibility:

* `toggleVisibilityOnClick` Toggles an element visibility.
* `hideVisibilityOnClick` Hides an element


Then for toggling a visibility create this button:

```
 <button role="button" class="button-toggle" data-control-element="#sidebar"onclick="toggleVisibilityOnClick(this)"></button>
```

In case you want to hide-only an element use this: 

```
 <button role="button" class="button-close" data-control-element="#sidebar"onclick="hideVisibilityOnClick(this)"></button>
```

## Css classes

There are special classes you can use upon buttons that allows you to manage the content of a button depending  the element is cliosed or not:

* `button-toggle` For buttons toggling a visibility, currently used upon sidebar.
* `button-close` For buttons that close (hide) a visible item.