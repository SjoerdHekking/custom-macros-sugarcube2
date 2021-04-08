# Dyslexia

Shuffle letters inside words to simulate dyslexia.

## Installation

If using the Twine desktop/web app, copy contents of `dyslexia.js` to the `Story JavaScript` section.

If using a compiler like Tweego, drop `dyslexia.js` to your source folder.

## Example Usage

The following example uses the default values of dyslexia.

```html
<<dyslexia>>
    given text will get it's letters randomly shuffled within the words. Numbers within the text, such as 4 or 20 will be ignored.
<</dyslexia>>
```

---

## Usage - Dyslexia arguments

'Dyslexia' has three arguments which allow things to be customized for your desire.
    - [Chance of shuffle](#Chance), default is 10%. (Argument1)
    - [Selecting word size](#Word-size), default is 3 letters. (Argument2)
    - [Delay of interval](#Delay), default is 50 milliseconds. (Argument3)

**Argument placement:**

```html
    <<dyslexia Argument1 Argument2 Argument3>>
        any text given.
    <</dyslexia>>
```

**Example:**

```html
<<dyslexia 20 4 100>>
    This example will have 20% chance to shuffle words, the words needs to be of a minimum length of 4 letters and the delay is 100 milliseconds or 0.1 second.
<</dyslexia>>
```

---

## Chance

**Arguments:**

- `Argument1`: *(integer)* chance.

'Dyslexia' has a default chance set to `10%`.
    - Only integers are accepted.
    - Minimum will be `1%` or an error will be thrown.
    - Maximum will be `100%` or an error will be thrown.

## Word size

- `Argument2`: *(integer)* size.

'Dyslexia' has a default word size set to `3`.
    - Only integers are accepted.
    - Minimum will be `2` or an error will be thrown.

## Delay

- `Argument3`: *(integer)* delay.

'Dyslexia' has a default delay of `50ms`, to prevent your browser from crashing.
    - Only integers are accepted.
    - Minimum will be `50ms` or an error will be thrown.

**NOTE:** Time is set in milliseconds and not in seconds.