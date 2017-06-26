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
        // If there is a selection we will substitute it with the content of the variable text
        if (el.selectionStart || el.selectionStart === 0) {

            startPos = el.selectionStart;
            endPos = el.selectionEnd;
            el.value = el.value.substring(0, startPos) + text + el.value.substring(endPos, el.value.length);

            // Fix the cursor position, else it appears at the end.
            el.setSelectionRange(startPos + text.length, startPos + text.length);

        // Else insert the content of the variable text
        } else {
            el.value += text;
         }

    }
}
