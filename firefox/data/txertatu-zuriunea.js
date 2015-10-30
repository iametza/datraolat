function insertTextAtCursor(text) {
    var sel;
    var range;
    var textNode;
    var startPos;
    var endPos;
    var el = document.activeElement;

    // https://twitter.com
    if (el.tagName === "DIV") {
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
    } else {
        // Hautapen bat badago...
        if (el.selectionStart || el.selectionStart === 0) {
            // Hautapena text-ekin ordezkatuko dugu.
            startPos = el.selectionStart;
            endPos = el.selectionEnd;
            el.value = el.value.substring(0, startPos) + text + el.value.substring(endPos, el.value.length);
        } else {
            // Hautapenik ez dagoenez bukaeran gehituko dugu.
            el.value += text;
        }
    }
}

insertTextAtCursor(String.fromCharCode("0x200B"));
