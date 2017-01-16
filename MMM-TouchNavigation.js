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

    start: function () {
        Log.info("Starting module: " + this.name);
        this.selected = [];
    },

    // Override the default NotificationRecieved function
    notificationReceived: function (notification, payload, sender) {
        if (notification === "CHANGED_PROFILE") {
            this.selected = [payload.to];
            this.updateDom(0);
            return;
        }

        if (notification === "ADDED_PROFILE") {
            this.selected.push(payload);
            this.updateDom(0);
            return;
        }

        if (notification === "REMOVED_PROFILE") {
            this.selected.splice(this.selected.indexOf(payload), 1);
            this.updateDom(0);
            return;
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
        
        if (self.selected.includes(name)) {
            item.className += " current-profile";
            if (data.type === "add") {
                item.addEventListener("click", function () {
                    self.sendNotification("REMOVE_PROFILE", name);
                });
            }
        } else if (data.type === "add") {
            item.addEventListener("click", function () {
                self.sendNotification("ADD_PROFILE", name);
            });
        } else {
            item.addEventListener("click", function () {
                self.sendNotification("CURRENT_PROFILE", name);
            });
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

        if (data.symbol) {
            var symbol = document.createElement("span");
            symbol.className = "navigation-symbol fa fa-" + data.symbol;

            if (data.text && data.symbol && placement === "left") {
                symbol.style.marginRight = "10px";
            }

            item.appendChild(symbol);
        }

        if (data.text) {
            var text = document.createElement("span");
            text.className = "navigation-text";
            text.innerHTML = data.text;

            if (data.text && data.symbol && placement === "right") {
                text.style.marginRight = "10px";
            }

            item.appendChild(text);
        }

        return item;
    }
});
