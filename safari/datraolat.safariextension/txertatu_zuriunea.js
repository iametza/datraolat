// http://stackoverflow.com/a/2925633/2855012
function insertTextAtCursor(text) {
    var sel, range, html;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);
            range.deleteContents();
            var textNode = document.createTextNode(text);
            range.insertNode(textNode);
            range.setStartAfter(textNode);
            sel.removeAllRanges();
            sel.addRange(range);
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}

function handleMessage (msgEvent) {
    var messageName = msgEvent.name;
    var messageData = msgEvent.message;
    
    if (messageName === "datraolat") {
        // Beste gehigarrietan bezala String.fromCharCode("0x200B") erabiltzen saiatu naiz baina ez zebilen.
        insertTextAtCursor('\u200b');
    }
}

if (window.top === window) {
    safari.self.addEventListener("message", handleMessage, false);
}
