// Function: S7ConfigObject()
// Purpose: Constructor for the S7ConfigObject class
// Param: None
// Output: A new instantiated S7ConfigObject instance
// Notes: No need to use this function explicitly
function S7ConfigObject()
{ 
	this.isVersion		= "2.8";
	// This root variables should be altered to reflect the server VIP you are on
	this.contentRoot = "http://s7d9.scene7.com/";
	this.isViewerRoot	= this.contentRoot + "s7viewers/";
	this.isRoot		= this.contentRoot + "is/image/";
}

var S7ConfigClient		= new S7ConfigObject();

function docWrite(line) {
    document.write(line);
}