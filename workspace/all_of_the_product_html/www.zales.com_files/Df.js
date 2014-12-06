if(Df){
}else{
	var Df = {}
}
/////////////////////////////////////// Animate /////////////////////////////////////////////////////
Df.Animate = function(re){
    
	var ref = $(re);
	
	var pars = this.pars = {
		time: 250,
		pause: 40,
		skip:false,
		onComplete: false,
		width: false,
		height: false,
		color: false,
		backgroundColor: false,
		backgroundPosition: false,
		left: false,
		top: false,
		opacity: false,
		fontSize: false,
		lineHeight: false,
		paddingLeft: false,
		paddingRight: false,
		paddingTop: false,
		paddingBottom: false,
		marginLeft: false,
		marginRight: false,
		marginTop: false,
		marginBottom: false,
		selectors: []
	}
	
	var possibleSelectors = [
		'width','height','color','left','top','fontSize', 'lineHeight',
		'paddingLeft','paddingRight','paddingTop','paddingBottom',
		'marginLeft','marginRight','marginTop','marginBottom',
		'opacity','backgroundColor', 'backgroundPosition'
	]
	var running = false;
	var iterations = false;
	var currentIteration = false;
	var animators = [];
	var coords = [];
	var history = [];
	var hpointer = 0;
	
	//public methods
	
	this.version = function(){
		return 1.3;
	}
	
	this.requires = function(){
		return [
			'../js/prototype1_6.js',
			'../js/prototype1_6_extend.js'	
			];
	}
	
	var run = this.run = function(para,fromHistory){
		//overide parametersalert(hpointer)
		if(para){
			pars = Object.extend(pars,para);
		}
		
		//load with initial state of element
		if(history.length == 0){
			loadInitialState();
			hpointer = 0;
		}
		
		//load record in history array
		if(!fromHistory){
			loadState();
			hpointer = history.length -1
		}
		
		//create an array of selector to animate
		createAnimators();
		
		if(animators.length == 0 && !fromHistory){
			history.pop()
			hpointer--
		}
		
		//determine the iterations the animation will take
		setIterations();
		
		//create an array of interation steps, how the selectors are set for each iteration
		createCoordHash();
		
		//run though the coords array with the set pause value
		if(coords.length > 0){
			running = true;
			stepThroughAnimation();
		}
		
	}
        
	this.getHistoryCount = function(){
		return history.length;
	}
	
	this.clear = function(){
		running = false;
		animators = [];
		history = [];
		hpointer = 0;
		iterations = false;
		currentIteration = false;
		coords = [];
	}
	
	var back = this.back = function(para){
		if(hpointer > 0){
			hpointer--;	
			finishCall(para);
		}
	}
	
	var next = this.next = function(para){
		if((hpointer + 1) < history.length){
			hpointer++;	
			finishCall(para);
		}
	}
	
	var first = this.first = function(para){
		hpointer = 0;
		finishCall(para);
	}
	
	var last = this.last = function(para){
		hpointer = (history.length-1);
		finishCall(para);
	}
   
	this.toggle = function(para){
		if(history.length == 0){
			finishCall(para);	
		}
		else if(hpointer == 1){
			first(para);
		}
		else if(hpointer == 0){
			last(para);
		}
	}
    
	//private methods
   
	var finishCall = function(para){
		if(para){
			Object.extend(history[hpointer],para);
		}
		run('',true);
	}
	
	var loadInitialState = function(){
		
		createSelectors()
		
		var copy = {}
		copy = Object.extend(copy,pars);
		
		var obj = {}
		for(var i=0; i<copy.selectors.length; i++){
			
			var val = ref.getStyle(copy.selectors[i]);
                        
			if(val != undefined){
                    
				obj[copy.selectors[i]] = val ;  
			}else{
                    
				obj[copy.selectors[i]] = false;  
			}
		}
		
		history.push(Object.extend(copy,obj));
	}
	
	var loadState = function(){
		
		createSelectors()
		
		history.push(Object.extend({},pars));
	}
	
	var createSelectors = function(){
		pars.selectors.length == 0
		possibleSelectors.each(function(v){
			if(pars[v] !== false){
				pars.selectors.push(v)
			}
		});
	}
	
	var createAnimators = function(){
		animators = [];
		
		for(var i=0; i<history[hpointer].selectors.length; i++){
			var elem = history[hpointer].selectors[i];
			
			if(history[hpointer][elem] !== false){
				
				var rawTargetValue = history[hpointer][elem]
                             
				//execute value function
				if(rawTargetValue.constructor == Function){
					rawTargetValue = rawTargetValue(ref);
				}
                             
				var val = ref.getStyle(elem);
         
				var currentValue = getCurrentValue(elem,val);
				
				var targetValue = getCurrentValue(elem,rawTargetValue);
				
				var units = getUnits(rawTargetValue);
				if(!units){
					units = getUnits(val);
				}
				
				var delta = getDelta(targetValue,currentValue);
				
				if(delta){
					animators.push({selector:elem,delta:delta,current:currentValue,units:units});
				}
                                
			}
		}
	}
	
	var setIterations = function(){
		if(history[hpointer].pause && history[hpointer].time){
			iterations = Math.ceil(history[hpointer].time/history[hpointer].pause);
		}
		else if(history[hpointer].skip && history[hpointer].pause){
			iterations = Math.ceil(getMaxAbsVal() / history[hpointer].skip);
		}
		currentIteration = 0;
	}
	
	var createCoordHash = function(){
		coords = [];
		if(animators.length > 0){
			for(var i=0; i<iterations; i++){
				coords.push(buildAnimateStep(i));
			}
		}
	}
	
	//recursive function that steps through the coords array based on pause value
	var stepThroughAnimation = function(){
		if(running){
			if(iterations > currentIteration){
				ref.setStyle(coords[currentIteration]);
				currentIteration++;
				setTimeout(stepThroughAnimation,history[hpointer].pause);
			}else{
				running = false;
				
				if(history[hpointer].onComplete){
					history[hpointer].onComplete(ref);
				}
			}
		}
	}
	
	var getMaxAbsVal = function(){
		var ary = [];
		for(var i=0; i<animators.length; i++){
			var val = animators[i].delta;
			if(val.constructor == Array){
				for(var j=0; j<val.length; j++){
					ary.push(Math.abs(val[j]));
				}
			}else{
				ary.push(Math.abs(val));
			}
		}
		return ary.max();
	}
	
	var buildAnimateStep = function(rec){
		var obj = {}
		
		for(var i=0; i<animators.length; i++){
			var elem = animators[i];
			
			var val = getInteratedValue(elem,rec);
			
			if(rec == (iterations-1)){
				
                                var rawTargetValue = history[hpointer][elem.selector]
                                //execute value function
                                if(rawTargetValue.constructor == Function){
                                     rawTargetValue = rawTargetValue(ref);
                                }
                                
                                val = getCurrentValue(elem.selector,rawTargetValue);
                        }
			obj[elem.selector] = setDisplayValue(elem.selector,val,elem.units);
		}
		return obj;
	}
	
	var getInteratedValue = function(elem,rec){
		var val = false;
		if(elem.delta.constructor == Array){
			val = [];
			
			for(var i=0; i<elem.delta.length; i++){
				if(history[hpointer].pause && history[hpointer].time){
					val.push(elem.current[i] + ((rec+1) * (elem.delta[i]/iterations)));
				}
				else if(history[hpointer].pause && history[hpointer].skip){
					
					val.push(plotSkipValue(elem.current[i],elem.delta[i],rec));
				}
			}
		}else{
			if(history[hpointer].pause && history[hpointer].time){
				val = elem.current + ((rec+1) * (elem.delta/iterations));
			}
			else if(history[hpointer].pause && history[hpointer].skip){
				val = plotSkipValue(elem.current,elem.delta,rec);
			}
			
		}
		return val;
	}
	
	var plotSkipValue = function(current,delta,rec){
		if(delta > 0){
			var plot = current + ((rec+1) * (history[hpointer].skip));
			
			if(plot <= current + delta){
				plot = plot;
			}else{
				plot = current + delta;
			}
		}else if(delta < 0){
			var plot = current - ((rec+1) * (history[hpointer].skip));
			
			if(plot >= current + delta){
				plot = plot;
			}else{
				plot = current + delta;
			}
		}else{
			var plot = 0;
		}
		return plot;
	}
	
	//takes two numeric values or two numeric arrays and returns the difference of the numbers or an array of the differences of each number in the array
	var getDelta = function(targetValue,currentValue){
		var res = false;
		var keepIt = false;
		if(targetValue.constructor == Array | currentValue.constructor == Array){
			res = [];
			for(var i=0; i<targetValue.length; i++){
				var delta = targetValue[i] - currentValue[i]
				if(delta){
					keepIt = true;
				}
				res.push(delta);
			}
			if(!keepIt){
				res = false;	
			}
		}else{
			res = targetValue - currentValue;
		}
		return res;
	}
	
	//takes a raw value and returns the unit measurement of that value
	var getUnits = function(val){
		var str = false;
		if(/px$/.test(val)){
			str = 'px';	
		}else if(/%$/.test(val)){
			str = '%';	
		}else if(/em$/.test(val)){
			str = 'em';	
		}
		return str;
	}
	
	//(NEEDS SOME WORK on UNITS) takes a selector, a number or an array of numbers, and a unit and returns the presentation ready value of the number(s)
	var setDisplayValue = function(elem,val,units){
		if(
			elem == 'width' | elem == 'height' | elem == 'top' | elem == 'left' | elem == 'fontSize'| elem == 'lineHeight'
			| elem == 'paddingLeft' | elem == 'paddingRight' | elem == 'paddingTop' | elem == 'paddingBottom'
			| elem == 'marginLeft' | elem == 'marginRight' | elem == 'margingTop' | elem == 'marginBottom'
		   ){
			val = parseInt(val);
		}else if(elem == 'opacity'){
			val = val/100;
		}
		else if(elem == 'color' | elem == 'backgroundColor'){
			val = hexFromArray(val);
		}
		else if(elem == 'backgroundPosition'){
			val = toBackgroundPositionString(val);
		}
		
		if(units && elem != 'backgroundPosition'){
			val += units;
		}
		
		return val;
	}
	
	//(NEEDS SOME WORK on UNITS) takes a numbers array [1,1] and returns the presentation value 1px 1px
	var toBackgroundPositionString = function(val){
		str = '';
		for(var i=0; i<val.length; i++){
			str += Math.round(val[i]) + 'px ';
		}
		return str;
	}
	
	//takes a numbers array [255,255,255] and returns the presentation value #ffffff
	var hexFromArray = function(val){
		var str = '#';
		for(var i=0; i<val.length; i++){
			str += parseInt(val[i]).toColorPart();
		}
		return str;
	}
	
	// takes a selector and a mixed raw value and returns the value(s) as a number or an array of numbers
	var getCurrentValue = function(elem,val){
		if(
			elem == 'width' | elem == 'height' | elem == 'top' | elem == 'left' | elem == 'fontSize' | elem == 'lineHeight'
			| elem == 'paddingLeft' | elem == 'paddingRight' | elem == 'paddingTop' | elem == 'paddingBottom'
			| elem == 'marginLeft' | elem == 'marginRight' | elem == 'marginTop' | elem == 'marginBottom'
		   ){
			val = parseInt(val);
		}
		else if(elem == 'opacity'){
			val = parseInt(val * 100);
		}
		else if(elem == 'color' | elem == 'backgroundColor'){
			val = toColorArray(val);
		}
		else if(elem == 'backgroundPosition'){
			val = toBackgroundPositionArray(val);
		}
		
		return val;
	}
	
	//(NEEDS SOME WORK) takes background position info in the form of 1px 1px and converts it to [1,1]
	var toBackgroundPositionArray = function(val){
		val = val.split(' ');
		for(var i=0; i<val.length; i++){
			val[i] = parseInt(val[i])
		}
		return val
	}
	
	//(NEEDS SOME WORK) takes color info in the form of #ffffff or rgb(255,255,255) and conterts it to [255,255,255] 
	var toColorArray = function(val){
		if(/^#/.test(val)){
			val = val.replace(/^#/g,'').replace(/(..)/g,"$1,").replace(/,$/g,'').split(',');
			for(var i=0; i<val.length; i++){
				if(val[i].constructor == String){
					val[i] = parseInt(val[i],16);	
				}
				val[i] = Number(val[i])
			}
			
		}else if(/^rgb/.test(val)){
			val = val.replace(/^rgb\(|\)$/g,'').split(',');
			for(var i=0; i<val.length; i++){
				val[i] = Number(val[i])
			}
		}
		return val
	}
}