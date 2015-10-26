chrome.browserAction.onClicked.addListener(function(activeTab) {
    chrome.tabs.executeScript({
        file: "txertatu-zuriunea.js"
    });
});
