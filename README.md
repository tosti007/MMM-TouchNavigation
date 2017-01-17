<!-- All the links I use multiple times in this readme file, this way I won't have to copy paste so often -->
[MMM-ProfileSwitcher]: https://github.com/tosti007/MMM-ProfileSwitcher
[MMM-TouchNavigation]: https://github.com/tosti007/MMM-TouchNavigation


# MMM-TouchNavigation

This an extension for the [MagicMirror²](https://magicmirror.builders/).
This Module adds a touch menu to switch between different profiles from the [MMM-ProfileSwitcher].

## Installation

Since I made this module to work in conjunction with the [MMM-ProfileSwitcher] you will have to install this module first.
You can read more information about how to install it on it's github page.

**Note:** it is also possible to use this module in conjunction with other modules since it only uses notifications,
if a module supports this navigation is up to the maker. More information about this in [Notes For Other Developers](#notes-for-other-developers).

After installing the [MMM-ProfileSwitcher].

In your terminal, go to your MagicMirror's Module folder:
````
cd ~/MagicMirror/modules
````

Clone this repository:
````
git clone https://github.com/tosti007/MMM-TouchNavigation.git
````

## Using the module

To use this module, add it to the modules array in the `config/config.js` file:
````javascript
modules: [
    {
        module: 'MMM-TouchNavigation',
        config: {
            // See 'Configuration options' for more information.
        }
    }
]
````

## Configuration options

The following properties can be configured:

| Option            | Description
| ----------------- | -----------
| `showBorder`      | Determines if the border around the buttons should be shown. <br><br> **Possible values:** `true` or `false` <br> **Default value:** `true`
| `minWidth`        | The minimum width for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `minHeight`       | The minimum height for all the buttons. <br><br> **Possible values:** `css length` <br> **Default value:** `0px`
| `symbolPlacement` | The location of the symbol relative to the text. <br><br> **Possible values:** `left`, `right`, `top` or `bottom` <br> **Default value:** `left`
| `direction`       | The direction of the menu. <br><br> **Possible values:** `row`, `column`, `row-reverse` or `column-reverse`<br> **Default value:** `row`
| `buttons`         | All the different buttons in the menu. <br><br> **Possible values:** a button configuration, see [Configuring Buttons](#configuring-buttons) <br> **Default value:** some example buttons


## Configuring Buttons
Buttons have to be placed in `buttons` in the `config`. A button contains a profile name as key and a configuration in an object (`{}`).

| Option   | Description
| -------- | -----------
| `text`   | A string to display in the button. <br><br> **Note:** if no value is set no text will be displayed. <br> **Possible values:** `string`
| `symbol` | A symbol to display in the button. <br><br> **Note:** if no value is set no symbol will be displayed. <br> **Possible values:** See [Font Awesome](http://fontawesome.io/icons/) website

An example:
````javascript
buttons: {
    "profile_name": { 
        // A button with text and a symbol
        text: "text to display",
        symbol: "ban"
    },
    "example1": {
        // A button with only a symbol
        symbol: "paper-plane"
    },
    "example2": {
        // A button with only text
        text: "Click me"  
    }
}
````

## An Example Module Configuration
An example configuration file has been added to this repository, file `example-config.js`.

## Notes
* **Important:** unfortunatly positioning this module as fullscreen will result in the menu floating top left. I currently do not know how to fix this but will look into it. If you know how don't hesitate to either write me or send me a pull request!
* Profile name is case sensitive.
* If both the `text` and `symbol` aren't set for a button then the button won't contain anything, but still show the border.
* The symbols are all form the [Font Awesome](http://fontawesome.io/icons/) website.
* The text may contain HTML tags and will be displayed as HTML.

## Notes For Other Developers
* When a button is pressed a `CURRENT_PROFILE` notification will be send.
* When a `CHANGED_PROFILE` notification is received the menu dom will be updated.

## The MIT License (MIT)

Copyright (c) 2017 Brian Janssen

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

**THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.**
