/*!
 * This wraps tempo.js
 * and manages variables which would otherwise be made global 
 */
var TempoWrap = {

   	"containerArray": "",
   	"prepareArray" : "",
    "prepare" : function (container, params, callback) {
    	
		if ("" == TempoWrap.containerArray){
			TempoWrap.containerArray = new Array();
			TempoWrap.prepareArray = new Array();
		}
	
    	for (var i = 0; i < TempoWrap.containerArray.length; ++i) {
    		if (TempoWrap.containerArray[i] == container){
    			return TempoWrap.prepareArray[i];
    		}
    	}
    	
    	tmpPrepare = Tempo.prepare(container);
    	TempoWrap.containerArray.push(container);
    	TempoWrap.prepareArray.push(tmpPrepare);
    	return tmpPrepare;
    }
};