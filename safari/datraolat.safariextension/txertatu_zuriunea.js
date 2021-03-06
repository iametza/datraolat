function insertTextAtCursor(text) {
    var sel;
    var range;
    var textNode;
    var startPos;
    var endPos;
    var el = document.activeElement;

    // https://twitter.com
    if (el.tagName === "DIV") {
        // http://stackoverflow.com/a/2925633/2855012
        if (window.getSelection) {
            sel = window.getSelection();

            if (sel.getRangeAt && sel.rangeCount) {
                range = sel.getRangeAt(0);
                range.deleteContents();
                textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.setStartAfter(textNode);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        } else if (document.selection && document.selection.createRange) {
            document.selection.createRange().text = text;
        }
    // https://tweetdeck.twitter.com
    // https://github.com
    // https://gitlab.com/
    // https://bitbucket.org/
    // ...
    } else {
        if (el.selectionStart || el.selectionStart === 0) {
            // Hautapenik balego text-ekin ordezkatuko dugu, bestela text txertatuko dugu besterik gabe.
            startPos = el.selectionStart;
            endPos = el.selectionEnd;
            el.value = el.value.substring(0, startPos) + text + el.value.substring(endPos, el.value.length);
            // Kurtsorearen kokapena zuzendu, bestela beti amaieran agertzen zen.
            el.setSelectionRange(startPos + text.length, startPos + text.length);
        } else {
            el.value += text;
         }

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
