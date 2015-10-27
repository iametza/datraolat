var self = require('sdk/self');

var buttons = require('sdk/ui/button/action');
var tabs = require("sdk/tabs");

var button = buttons.ActionButton({
    id: "txertatu-zuriune-ikustezina",
    label: "Txertatu zuriune ikustezina",
    icon: {
        "16": "./ikonoa-16.png",
        "32": "./ikonoa-32.png",
        "64": "./ikonoa-64.png"
    },
    onClick: handleClick
});

function handleClick(state) {
    require("sdk/tabs").activeTab.attach({
        contentScriptFile: self.data.url("txertatu-zuriunea.js")
    });
}
