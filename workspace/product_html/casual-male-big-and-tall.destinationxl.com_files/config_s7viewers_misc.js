// Function: S7ConfigObject()
// Purpose: Constructor for the S7ConfigObject class
// Param: None
// Output: A new instantiated S7ConfigObject instance
// Notes: No need to use this function explicitly
function S7ConfigObject()
{
	this.isVersion		= "2.8";
	// These root variables should be altered to reflect the server VIP you are on
	// For example, if you call sample.scene7.com/is/image, you should use that here
	this.isViewerRoot	= "http://images.destinationxl.com/s7viewers";
	this.isRoot		= "http://images.destinationxl.com/is/image/";

}

var S7ConfigClient		= new S7ConfigObject();

function docWrite(line) {
    document.write(line);
}