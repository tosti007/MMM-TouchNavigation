/* global Module */

/* Magic Mirror
 * Module: MMM-TouchNavigation
 *
 * By Brian Janssen
 * MIT Licensed.
 */

Module.register("MMM-TouchNavigation", {
    // Default module config.
    defaults: {
        // Determines if the border around the buttons should be shown.
        showBorder: true,
        // The minimum width for all the buttons.
        minWidth: "0px",
        // The minimum height for all the buttons.
        minHeight: "0px",
        // The location of the symbol relative to the text.
        symbolPlacement: "left",
        // The direction of the menu.
        direction: "row",
        // All the different buttons in the menu.
        buttons: {
            "default": {
                text: "Default",
                symbol: "ban"
            },
            "everyone": {
                text: "Example",
                symbol: "users"
            }
        }
    },

    // Define required styles.
    getStyles: function() {
        return ["font-awesome.css", this.file('MMM-TouchNavigation.css')];
    },

    // Override the default NotificationRecieved function
    notificationReceived: function (notification, payload, sender) {
        if (notification === "CHANGED_PROFILE") {
            this.selected = payload.to;
            this.updateDom(0);
        }
    },

    // Override dom generator.
    getDom: function() {
        var menu = document.createElement("span");
        menu.className = "navigation-menu";
        menu.id = this.identifier + "_menu";
        menu.style.flexDirection = this.config.direction;

        for (var name in this.config.buttons) {
            menu.appendChild(this.createButton(this, name, this.config.buttons[name], this.config.symbolPlacement));
        }

        return menu;
    },

    createButton: function (self, name, data, placement) {
        var item = document.createElement("span");
        item.id = self.identifier + "_button_" + name;
        item.className = "navigation-button";
        item.style.minWidth = self.config.minWidth;
        item.style.minHeight = self.config.minHeight;
        
        if (self.selected === name) {
            item.className += " current-profile";
        }

        item.style.flexDirection = {
            "right"  : "row-reverse",
            "left"   : "row",
            "top"    : "column",
            "bottom" : "column-reverse"
        }[placement];

        if (!self.config.showBorder) {
            item.style.borderColor = "black";
        }

        item.addEventListener("click", function () {
            self.sendNotification("CURRENT_PROFILE", name);
        });

        if (data.symbol) {
            var symbol = document.createElement("span");
            symbol.className = "navigation-symbol fa fa-" + data.symbol;

            if (data.text && placement === "left") {
                symbol.style.marginRight = "10px";
            }

            item.appendChild(symbol);
        } else if (data.img) {
            var image = document.createElement("img");
            image.className = "navigation-symbol";
            image.src = data.img;
            if (data.width)  image.width  = data.width;
            if (data.height) image.height = data.height;
            
            if (data.text && placement === "left") {
                image.style.marginRight = "10px";
            }

            item.appendChild(image);
        }

        if (data.text) {
            var text = document.createElement("span");
            text.className = "navigation-text";
            text.innerHTML = data.text;

            if ((data.symbol || data.img) && placement === "right") {
                text.style.marginRight = "10px";
            }

            item.appendChild(text);
        }

        return item;
    }
});
