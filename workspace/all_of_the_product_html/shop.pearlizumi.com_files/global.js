function checkAction(id, type_id, name, mode, location) {
    if(confirm("Are you sure you want to " + mode + " " + name)) {
        document.location = location + "?" + type_id + "id=" + id + "&mode=" + mode;
        return true;

    } else {
        return false;
    }
}

function confirmAction(msg, url) {
    if (confirm(msg)) {
        document.location = url;
    }
}

function imageRollOver(imgID, image) {
    imgID.src = image;
}

function textRollOver(textID, hexColor) {
    textID.style.color = hexColor;
}

// toggle list of checkboxes on or off
var checkFlag = true;

function toggleAll(val) {
    var checks = document.getElementsByName(val);

    for (var i = 0; i < checks.length; i++) {
        checks[i].checked = checkFlag;
    }
    checkFlag = !checkFlag;
}

function wopen( url, options ) {
    window.open( url, '', 
        'width=' + (options.width ? options.width : 800) + 
        ',height=' + (options.height ? options.height : 600) +
        ',buttons=' + (options.buttons ? 1 : 0) + 
        ',resizable=' + (options.resizable ? 1 : 0) +
        ',menubar=' + (options.menubar ? 1 : 0) + 
        ',status=' + (options.status ? 1 : 0) +
        ',scrollbars=' + (options.scrollbars ? 1 : 0) +
        ',location=' + (options.location ? 1 : 0) 
    );
}

function getAbsoluteTop( objectId ) {
	// Get an object top position from the upper left viewport corner
	// Tested with relative and nested objects
	var oParent;
	var o = document.getElementById(objectId);
	var oTop = o.offsetTop;            // Get top position from the parent object
	while( o.offsetParent!=null ) { // Parse the parent hierarchy up to the document element
		oParent = o.offsetParent;  // Get parent object reference
		oTop += oParent.offsetTop; // Add parent top position
		o = oParent
	}
	// Return top position
	return oTop;
}

function getAbsoluteBottom( objectId ) { 
	if( document.documentElement )
		var oBottom = document.getElementById( objectId ).clientHeight + getAbsoluteTop( objectId );
	else
		var oBottom = document.getElementById( objectId ).offsetHeight + getAbsoluteTop( objectId );
	return oBottom;
}

function getHeight( objectId ) {
    return document.getElementById( objectId ).offsetHeight;
}

function validate_abide( form ) {
    try {
        if( ! form.agree_to_abide.checked ) {
            alert( "Please agree to abide by the program rules." );
            return false;
        }
    } catch(err) {
        return true;
    }

    return true;
}
