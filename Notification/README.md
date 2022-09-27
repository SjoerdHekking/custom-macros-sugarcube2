# Flash

Advanced notification system with 13 optional settings. 

## Installation

If using the Twine desktop/web app, copy contents of `flash.js` to the `Story JavaScript` section, and copy contents of `flash.css` to the `Story Stylesheet` section.

If using a compiler like Tweego, drop `flash.js` and `flash.css` to your source folder.

## Example Usage

The following example uses the default values of flash.

```html
<<flash "You found Maxine!">>
<</flash>>
```
![Flash example](../Resources/Gif/example4.gif)
---

## Usage - Flash arguments

1. 'Flash' has fourteen (yes 14) arguments which allow things to be customized for your desire. I recommend staying away from 7, and 10 to and including 14, unless you know what you're doing.
    - [Input text](#Text), there is no default, this must be user provided. (Argument 1)
    - [Type](#Type), default is `default`, (Argument 2)
    - [Progress](#Progress), default is `true` (Argument 3)
    - [Interactive](#Interactive), default is `true`. (Argument 4)
    - [Timeout](#Timeout), default is `8000`ms. (Argument 5)
    - [Delay](#Delay), default is `200`ms. (Argument 6)
    - [Container](#Container), default is `.flash-container`. (Argument 7)
    - [Theme](#Theme), default is `default`. (Argument 8)
    - [Layout](#Layout), default is `top-right`. (Argument 9)
    - [Container Class](#ContainerClass), default is `flash-container`. (Argument 10)
    - [Flash Class](#FlashClass), default is `flash-message`. (Argument 11)
    - [Visible Class](#VisibleClass), default is `is-visible`. (Argument 12)
    - [Progress Class](#ProgressClass), default is `flash-progress`. (Argument 13)
    - [Hidden Class](#HiddenClass), default is `is-hidden`. (Argument 14)
2. 'Flash' has a custom type insertion system, for if the default 7 options aren't enough.
    - [Inserting new type](#TypeInsert), this is completely custom, so no default.
    - [Using new Type](#Type), refer to Argument 2 for usage, because the newly inserted type can be used like the defaults now.
    - [Important styling](#StylingType), if you want to have custom styling, please copy and edit the `css` found here. 


**Argument placement:**
(You can cherry pick which arguments to use)
```html
<<flash Argument1>>
    <<flashType Argument2>>
    <<Progress Argument3>>
    <<Interactive Argument4>>
    <<Timeout Argument5>>
    <<Delay Argument6>>
    <<Container Argument7>>
    <<Theme Argument8>>
    <<Layout Argument9>>
    <<classContainer Argument10>>
    <<classFlash Argument11>>
    <<classVisible Argument12>>
    <<classProgress Argument13>>
    <<classHidden Argument14>>
<</flash>>
```

**Example:**

```html
<<flash "Ew, a nasty bug has been found">>
    <<flashType "bug">>
    <<Timeout 6000>>
    <<Delay 1000>>
    <<Theme "dark">>
<</flash>>
```
![flash example](../Resources/Gif/example4a.gif)
---

## Text

- `Argument1`: *(string)* text.

1. 'Flash' has no default, user must submit a string with text.
    - Only UTF-8 is accepted.
    - Must be user supplied.

## Type

- `Argument2`: *(string)* flash type.

1. 'flash' has a default flash type set to `default`.
    - Only string are accepted.
    - The following strings are accepted: `success`, `warning`, `error`, `info`, `bug`, `disabled`, `default`.

## Progress

- `Argument3`: *(boolean)* progress bar.

1. 'flash' has a default progress set to `true`.
    - Only booleans are accepted.

## Interactive

- `Argument4`: *(boolean)* interaction.

1. 'flash' has a default interaction set to `true`.
    - Only booleans are accepted.

## Timeout

- `Argument5`: *(integer)* time-out in milliseconds.

1. 'flash' has a default time-out set to `8000`ms or `8`s.
    - Only integers are accepted.
    - Minimum will be `500` or an error will be thrown.
    - Maximum will be `100000` or an error will be thrown.

## Delay

- `Argument6`: *(integer)* delay in milliseconds.

1. 'flash' has a default delay set to `200`ms or `0.2`s.
    - Only integers are accepted.
    - Minimum will be `50` or an error will be thrown.
    - Maximum will be `100000` or an error will be thrown.

## Container

- `Argument7`: *(string)* flash container.

1. 'flash' has a default container set to `.flash-container`.
    - Only string are accepted.

**NOTE:** The element must exist before the macro is called.

## Theme

- `Argument8`: *(string)* theme.

1. 'flash' has a default theme set to `default`.
    - Only string are accepted.
    - The following strings are accepted: `dark`, `default`.

## Layout

- `Argument9`: *(string)* layout.

1. 'flash' has a default layout set to `top-right`.
    - Only string are accepted.
    - The following strings are accepted: `top-right`, `middle-right`, `bottom-right`, `middle-bottom`, `bottom-left`, `middle-left`, `top-left`, `middle-top`.

## ContainerClass

- `Argument10`: *(string)* flash container class.

1. 'flash' has a default flash container class set to `flash-container`.
    - Only string are accepted.

**NOTE:** This breaks ALL existing `css` rules. Thus, the user must supply their own.

## FlashClass

- `Argument11`: *(string)* flash class.

1. 'flash' has a default flash class set to `flash-message`.
    - Only string are accepted.

**NOTE:** This breaks ALL existing `css` rules. Thus, the user must supply their own.

## VisibleClass

- `Argument12`: *(string)* flash visible class.

1. 'flash' has a default flash visible class set to `is-visible`.
    - Only string are accepted.

**NOTE:** This breaks ALL existing `css` rules. Thus, the user must supply their own.

## ProgressClass

- `Argument13`: *(string)* flash progress class.

1. 'flash' has a default flash progress class set to `flash-progress`.
    - Only string are accepted.

**NOTE:** This breaks ALL existing `css` rules. Thus, the user must supply their own.

## HiddenClass

- `Argument14`: *(string)* flash progress hidden class.

1. 'flash' has a default flash progress hidden class set to `is-hidden`.
    - Only string are accepted.

**NOTE:** This breaks ALL existing `css` rules. Thus, the user must supply their own.

## TypeInsert

1. `StoryInit`: *(strings)*'s flash can receive custom types through the use of `StoryInit`. Below is an example of the type 'Wizardry'. Please edit 'Wizardry' with your own custom type(s).
    - `<<run window.FlashMessage.addCustomVerbs('wizardry');>>` this command must be placed in `StoryInit`.
    - `window.FlashMessage.addCustomVerbs('wizardry', 'example', 'custom', 'many');` this command accepts comma seperated strings.
**NOTE:** Please put it in `StoryInit` and not somewhere else.

## StylingType

1. `Story Stylesheet`: *(strings)*'s to make sure your newly added type actually does something we **must** give it custom styling. Please edit 'Wizardry' with your own custom name(s).
    - 
```css
.flash-container .flash-message.flash-wizardry .flash-progress {
    /* Progress bar color */
    background-color: rgba(255, 153, 0, 0.15);
}
.flash-container .flash-message.flash-wizardry:before {
    /* Left line color */
    background-color: #ffcc00;
}
.flash-container .flash-message.flash-wizardry:after {
    /* Icon color */
    color: rgba(255, 179, 0, 0.5);
    /* Icon from tme-fa-icons */
    content: '\e83a';
    /* Change this if you want to use font-awesome icons or something else */
    font-family: "tme-fa-icons";
}
```
    -
```html
<<flash "The wizard of SugarCube">>
    <<flashType "wizardry">>
<</flash>>
```

![flash styling example 2](../Resources/Gif/example4d.gif)

## Styling

1. 'flash' uses a nested `<div></div>` as output.
    - `<div class="flash-container"></div>`: *(class)*.

**Example:**

```css
.flash-container {
    z-index: 1000;
    max-width: 50%;
    position: fixed;
}
.flash-message {
    border: double 10px;
    color: red;
}
```
**NOTE:** It's not recommended to touch anything out of the VARIABLE theme settings.

![flash styling example](../Resources/Gif/example4b.gif)