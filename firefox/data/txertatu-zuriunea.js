function getNextNode(node, skipChildren, endNode) {
  //if there are child nodes and we didn't come from a child node
  if (endNode == node) {
    return null;
  }
  if (node.firstChild && !skipChildren) {
    return node.firstChild;
  }
  if (!node.parentNode){
    return null;
  }
  return node.nextSibling
         || getNextNode(node.parentNode, true, endNode);
};

function getNodesInRange(range) {
    var startNode = range.startContainer.childNodes[range.startOffset]
    		|| range.startContainer;//it's a text node
    var endNode = range.endContainer.childNodes[range.endOffset]
    		|| range.endContainer;

    if (startNode == endNode && startNode.childNodes.length === 0) {
    	return [startNode];
    };

    var nodes = [];
    do {
    	nodes.push(startNode);
    }
    while (startNode = getNextNode(startNode, endNode));
    return nodes;
};

function getTextareasInRange(range) {
    var nodes = getNodesInRange(range);
    var textareas = [];

    for (var i = 0; i < nodes.length; i++) {
        if (nodes[i].type === "textarea") {
            textareas.push(nodes[i]);
        }
    }
    return textareas;
}

// http://stackoverflow.com/a/2925633/2855012
function insertTextAtCursor(text) {
    var sel, range, textareas;
    if (window.getSelection) {
        sel = window.getSelection();
        if (sel.getRangeAt && sel.rangeCount) {
            range = sel.getRangeAt(0);

            textareas = getTextareasInRange(range);

            // range-an textarea-k daudenean else-ko kodeak ez zuen text behar zen lekuan txertatzen.
            // Adibidez, https://tweetdeck.twitter.com/-en hori gertatzen zen.
            // textarea bat baino gehiago badaude?
            // https://www.facebook.com-en ez dabil, zergatik?
            if (textareas.length > 0) {
                if (textareas[0].selectionStart || textareas[0].selectionStart == '0') {
                    var startPos = textareas[0].selectionStart;
                    var endPos = textareas[0].selectionEnd;
                    textareas[0].value = textareas[0].value.substring(0, startPos)
                        + text
                        + textareas[0].value.substring(endPos, textareas[0].value.length);
                } else {
                    textareas[0].value += text;
                }
            // range-an textarea-rik ez dagoenean.
            // Adibidez, https://twitter.com/-en.
            } else {
                range.deleteContents();
                var textNode = document.createTextNode(text);
                range.insertNode(textNode);
                range.setStartAfter(textNode);
                sel.removeAllRanges();
                sel.addRange(range);
            }
        }
    } else if (document.selection && document.selection.createRange) {
        document.selection.createRange().text = text;
    }
}

insertTextAtCursor(String.fromCharCode("0x200B"));
