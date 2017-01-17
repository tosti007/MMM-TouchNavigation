/* Magic Mirror Config Sample
 *
 * By Michael Teeuw http://michaelteeuw.nl
 * MIT Licensed.
 */

var config = {
    port: 8080,
    ipWhitelist: ["127.0.0.1", "::ffff:127.0.0.1", "::1"],

    language: "en",
    timeFormat: 24,
    units: "metric",

    modules: [
        {
            module: "alert"
        },
        {
            module: "MMM-ProfileSwitcher"
        },
        {
            module: "MMM-TouchNavigation",
            position: "bottom_center",
            classes: "default everyone",
            config: {
                buttons: {
                    "default": {
                        symbol: "ban"
                    },
                    "Brian": {
                        text: " Brian",
                        symbol: "paper-plane"
                    },
                    "Lisa": {
                        text: "Lisa"
                    }
                }
            }
        },
        {
            module: "clock",
            classes: "everyone",
            position: "top_left"
        },
        {
            module: "clock",
            classes: "default",
            position: "middle_center",
            config: {
                analogShowDate: false,
                displayType: "analog"
            }
        },
        {
            module: "helloworld",
            classes: "Lisa",
            position: "lower_third"
        },
        {
            module: "helloworld",
            position: "top_right",
            classes: "Brian"
        }
    ]
};

/*************** DO NOT EDIT THE LINE BELOW ***************/
if (typeof module !== "undefined") {module.exports = config;}
