//-----------------------------------------------------------------
// Copyright (c) Tecla.it 2011
//-----------------------------------------------------------------

/** 
 * @fileOverview This is a wrapper class to support logging in javascript classes and scripts.
 * The implementation is based and works only with Firebug console.
 * 
 * @author Lorenzo Cavina (l.cavina@tecla.it)
 */
function Logger(classname,level){
	
	this.classname = classname;
	this.methodname = null;
	
	this.level = level;
	
	this.setLevel = function(level){
		this.level = level;
	};
	
	this.enter = function(methodname){
		this.methodname = methodname;
		this.log('Entering.');
	};
	
	this.exit = function(methodname){
		this.log('Exiting.');
		this.methodname = null;
	};
	
	this.log = function(methodname,message) {
		
		if(this.level == Level.WARN || this.level == Level.ERROR || this.level == Level.NONE)
			return;
		
		if(window.console){
			
			// message only
			if(arguments.length == 1){
				
				if(this.hasClassName()){
					if(this.hasMethodName()){
						console.log("["+this.classname+"."+this.methodname+"] " + Level.TRACE + " " + methodname);
						return;
					} else {
						console.log("["+this.classname+"] " + Level.TRACE + " " + methodname);
						return;
					}
				}
			// method name and message	
			} else {
		
				if(this.hasClassName()){
					if(methodname != null && methodname != undefined){
						console.log("["+this.classname+"."+methodname+"] " + Level.TRACE + " " + message);
						return;
					} else if(this.hasMethodName()){
						console.log("["+this.classname+"."+this.methodname+"] " + Level.TRACE + " " + message);
						return;
					} else {
						console.log("["+this.classname+"] " + Level.TRACE + " " + message);
						return;
					}
				}
			}
			
			console.log(message);
		}
    };
    
    this.debug = function(methodname,message) {
    	
    	if(this.level == Level.WARN || this.level == Level.ERROR || this.level == Level.NONE)
			return;
		
    	if(window.console){
			
			// message only
			if(arguments.length == 1){
				
				if(this.hasClassName()){
					if(this.hasMethodName()){
						console.debug("["+this.classname+"."+this.methodname+"] " + Level.DEBUG + " " + methodname);
						return;
					} else {
						console.debug("["+this.classname+"] " + Level.DEBUG + " " + methodname);
						return;
					}
				}
			// method name and message	
			} else {
		
				if(this.hasClassName()){
					if(methodname != null && methodname != undefined){
						console.debug("["+this.classname+"."+methodname+"] " + Level.DEBUG + " " + message);
						return;
					} else if(this.hasMethodName()){
						console.debug("["+this.classname+"."+this.methodname+"] " + Level.DEBUG + " " + message);
						return;
					} else {
						console.debug("["+this.classname+"] " + Level.DEBUG + " " + message);
						return;
					}
				}
			}
			
			console.debug(message);
		}
    };
    
    this.warn = function(methodname,message) {
		
    	if(this.level == Level.ERROR || this.level == Level.NONE)
			return;
    	
		if(window.console){
			
			// message only
			if(arguments.length == 1){
				
				if(this.hasClassName()){
					if(this.hasMethodName()){
						console.warn("["+this.classname+"."+this.methodname+"] " + Level.WARN + " " + methodname);
						return;
					} else {
						console.warn("["+this.classname+"] " + Level.WARN + " " + methodname);
						return;
					}
				}
			// method name and message	
			} else {
		
				if(this.hasClassName()){
					if(methodname != null && methodname != undefined){
						console.warn("["+this.classname+"."+methodname+"] " + Level.WARN + " " + message);
						return;
					} else if(this.hasMethodName()){
						console.warn("["+this.classname+"."+this.methodname+"] " + Level.WARN + " " + message);
						return;
					} else {
						console.warn("["+this.classname+"] " + Level.WARN + " " + message);
						return;
					}
				}
			}
			
			console.warn(message);
		}
    };
    
    this.error = function(methodname,message) {
		
    	if(this.level == Level.NONE)
			return;
    	
    	if(window.console){
			
			// message only
			if(arguments.length == 1){
				
				if(this.hasClassName()){
					if(this.hasMethodName()){
						console.error("["+this.classname+"."+this.methodname+"] " + Level.ERROR + " " + methodname);
						return;
					} else {
						console.error("["+this.classname+"] " + Level.ERROR + " " + methodname);
						return;
					}
				}
			// method name and message	
			} else {
		
				if(this.hasClassName()){
					if(methodname != null && methodname != undefined){
						console.error("["+this.classname+"."+methodname+"] " + Level.ERROR + " " + message);
						return;
					} else if(this.hasMethodName()){
						console.error("["+this.classname+"."+this.methodname+"] " + Level.ERROR + " " + message);
						return;
					} else {
						console.error("["+this.classname+"] " + Level.ERROR + " " + message);
						return;
					}
				}
			}
			
			console.error(message);
		}
    };
    
    this.hasClassName = function() {
		
    	if(this.classname != null && this.classname != undefined && this.classname != '')
    		return true;
    	
    	return false;
    };
    
    this.hasMethodName = function() {
		
    	if(this.methodname != null && this.methodname != undefined && this.methodname != '')
    		return true;
    	
    	return false;
    };
}