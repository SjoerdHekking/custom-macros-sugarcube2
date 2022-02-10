# Word wheel

Words will circle around the cursor and follow it, where it ventures.

## Installation

If using the Twine desktop/web app, copy contents of `wordwheel.js` to the `Story JavaScript` section, and copy contents of `wordwheel.css` to the `Story Stylesheet` section.

If using a compiler like Tweego, drop `wordwheel.js` and `wordwheel.css` to your source folder.

## Example Usage

The following example uses the default values of wordwheel.

```html
<<wordwheel "Sjoerd Hekking and Gwen have a secret">>
<</wordwheel>>
```
![Wordwheel example](../Resources/Gif/example1b.gif)
---

## Usage - Word wheel arguments

1. 'Word wheel' has three arguments which allow things to be customized for your desire.
    - [Input text](#Text),There is no default, this must be user provided. (Argument1)
    - [Selecting Font-size](#Font-size), default is 14. (Argument2)
    - [Circle diameter](#Diameter), default is 22. (Argument3)

**Argument placement:**

```html
<<wordwheel Argument1>>
    <<fontsize Argument2>>
    <<circlesize Argument3>>
<</wordwheel>>
```

**Example:**

```html
<<wordwheel "Cycy gives Sjoerd a bonk">>
    <<fontsize "20">>
    <<circlesize "30">>
<</wordwheel>>
```
![wordwheel example](../Resources/Gif/example2b.gif)
---

## Text

- `Argument1`: *(string)* text.

1. 'wordwheel' has no default, user must submit a string with text.
    - Only UTF-8 is accepted.
    - Must be user supplied.

## Font size

- `Argument2`: *(integer)* font size.

1. 'wordwheel' has a default word size set to `14`.
    - Only integers are accepted.
    - Minimum will be `1` or an error will be thrown.
    - Maximum will be `30` or an error will be thrown.

## Diameter

- `Argument3`: *(integer)* circle diameter.

1. 'wordwheel' has a default diameter of `22`.
    - Only integers are accepted.
    - Minimum will be `20` or an error will be thrown.
    - Maximum will be `70` or an error will be thrown.

**NOTE:** Diameter is also dependend on [Font size](#Font-size).

## Styling

1. 'wordwheel' uses a nested `<div></div>` as output.
    - `<div id="outerCircleText"></div>`: *(id)*.

**Example:**

```css
#outerCircleText {
    color: red;
    font-style: italic;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3000;
    cursor: default;
}
```

As seen above, one needs to change the rules of `#outerCircleText` in order to style the word wheel. In this example the color was changed from red to white and italics were applied.

```css
#outerCircleText {
    color: red;
    font-style: italic;
}
```

**NOTE:** Don't touch any position property.

![wordwheel styling example](../Resources/Gif/example3b.gif)