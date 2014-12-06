/*
ADOBE CONFIDENTIAL
Copyright 2011 Adobe Systems Incorporated
All Rights Reserved.

NOTICE:  All information contained herein is, and remains the property of Adobe Systems Incorporated and its suppliers,
if any.  The intellectual and technical concepts contained herein are proprietary to Adobe Systems Incorporated and its
suppliers and may be covered by U.S. and Foreign Patents, patents in process, and are protected by trade secret or 
copyright law. Dissemination of this information or reproduction of this material is strictly forbidden unless prior 
written permission is obtained from Adobe Systems Incorporated.
*/
/**
General-purpose class which allows to ran value transition using user-specified transition function. Total transition time is specified in constructor and configured
using getTotalTime/setTotalTime methods.
The type of transition is configured using getType/setType methods, by default it is CTransitionTypeLinear(0, 1). Three transition types are provided out of the box:
CTransitionTypeLinear, CTransitionTypeQuadratic and CTransitionTypeExp, but it is possible to implement custom transition types.
During transition X is always changed within [0; 1] bounds. Transition can be started from any value within allowed range, and can be stopped at any time.
Client code receives notifications about running transition by overriding onChange callback. The state of the transition can be obtained using getX, getValue
and isWorking methods.

Examples:
1) Run linear transition from 50 to 150 during 3 seconds.
var transition = new s7js.flyout.Transition(3000);
transition.setType(new s7js.flyout.TransitionTypeLinear(50, 150));
transition.onChange = function(inTransition) {
	trace('value: ' + inTransition.getValue());
};
transition.startTransition();

2) Run quadratic transition from -100 to 100, slowing down in the end, during 1 second.
var transition = new s7js.flyout.Transition(1000);
transition.setType(new s7js.flyout.TransitionTypeQuadratic(100, -100, false));
transition.onChange = function(inTransition) {
	trace('value: ' + inTransition.getValue());
};
transition.startTransition();


3) Run exponential transition from 0 to 100, speeding up in the end, during 0.5 second.
var transition = new s7js.flyout.Transition(500);
transition.setType(new s7js.flyout.TransitionTypeExpInOut(0, 100, true, 0.1));
transition.onChange = function(inTransition) {
	trace('value: ' + inTransition.getValue());
};
transition.startTransition();

4) Run exponential ease in/out transition from 0 to 100, speeding up to the middle and slowing down to the end, during 0.5 second.
var transition = new s7js.flyout.Transition(500);
transition.setType(new s7js.flyout.TransitionTypeExpInOut(0, 100, 0.1));
transition.onChange = function(inTransition) {
	trace('value: ' + inTransition.getValue());
};
transition.startTransition();
*/
/**
Creates new CTransition insatnce with given transition time.
@param inTotalTime:Number total transition time, in ms
*/
s7js.flyout.Transition = function(inTotalTime) {
	this.totalTime = inTotalTime;
	this.intervalId = null;
	this.delay = 10;

	this.x = 0;
	this.startX = 0;
	this.endX = 1;
	this.type = null;

	this.startTime = -1;
	this.setType(new s7js.flyout.TransitionTypeLinear(0, 1));
};

//PUBLIC METHODS.

/**
Returns total transition time.
@return :Number total transition time, in ms
*/
s7js.flyout.Transition.prototype.getTotalTime = function() {
	return this.totalTime;
};

/**
Sets total transition time.
@param inTotalTime:Number total transition time, in ms
*/
s7js.flyout.Transition.prototype.setTotalTime = function(inTotalTime) {
	this.totalTime = inTotalTime;
};

/**
Returns start value for the currently configured transition.
@return :Number start value
*/
s7js.flyout.Transition.prototype.getStartValue = function() {
	return this.type.direct(this.startX);
};

/**
Sets start value for the currently transition.
@param inStartValue:Number start value
@throws :EEXception if transition is running, or if value does not correspond to the [0; 1] X range
*/
s7js.flyout.Transition.prototype.setStartValue = function(inStartValue) {
	if (this.isWorking()) {
		s7js.flyout.Utils.log('can\'t set start value [' + inStartValue + '] when working');
		return;
	}
	var startX = this.type.reverse(inStartValue);
	if ((startX < 0) || (startX > 1)) {
		s7js.flyout.Utils.log('startX [' + startX + '] is out of bounds');
		return;
	}
	this.startX = startX;
};

/**
Returns end value for the currently configured transition.
@return :Number end value
*/
s7js.flyout.Transition.prototype.getEndValue = function() {
	return this.type.direct(this.endX);
};

/**
Sets end value for the currently transition.
@param inEndValue:Number end value
@throws :EEXception if transition is running, or if value does not correspond to the [0; 1] X range
*/
s7js.flyout.Transition.prototype.setEndValue = function(inEndValue) {
	if (this.isWorking()) {
		s7js.flyout.Utils.log('can\'t set end value [' + inEndValue + '] when working');
		return;
	}
	var endX = this.type.reverse(inEndValue);
	if ((endX < 0) || (endX > 1)) {
		s7js.flyout.Utils.log('endX [' + endX + '] is out of bounds');
		return;
	}
	this.endX = endX;
};

/**
Returns transition type.
@return :Object transition type
*/
s7js.flyout.Transition.prototype.getType = function() {
	return this.type;
};

/**
Sets transition type. Type must be an object with two methods: 'direct' and 'reverse', defined as following:
//returns value for given X coordinate, X is always within [0; 1] bounds
obj.direct = function(inX) {
};
//returns X for given value coordinate
obj.reverse = function(inValue) {
};
This method performs quick check of these two functions to ensure they are symmetric, which means that reverse(direct(0))==0 and reverse(direct(1))==1.
It is adviced to also have toString method in the type object for debugging purposes.
There are three transition types supplied: CTransitionTypeLinear, CTransitionTypeQuadratic and CTransitionTypeExp.
@param inType:Object transition type
*/
s7js.flyout.Transition.prototype.setType = function(inType) {
	if (this.isWorking()) {
		s7js.flyout.Utils.log('can\'t set type [' + inType + '] when working');
		return;
	}
	if (!this.validateType(inType)) {
		return;
	}
	this.type = inType;
	this.minX = 0;
	this.maxX = 1;
	this.x = 0;
};

/**
Starts transition.
*/
s7js.flyout.Transition.prototype.startTransition = function() {
	if (this.intervalId == null) {
		var selfRef = this;
		this.intervalId = setInterval(
			function() {
				selfRef.doTransition();
			}, 
			this.delay
		);
	}
	this.startTime = (new Date()).getTime();
	this.x = this.startX;
	this.onChange(this);
};

/**
Stops transition.
*/
s7js.flyout.Transition.prototype.stopTransition = function() {
	if (this.isWorking()) {
		clearInterval(this.intervalId);
		delete this.intervalId;
		this.onChange(this);
	}
};

/**
Returns true if transition is running, false otherwise.
@return :Boolean  whether transition is running
*/
s7js.flyout.Transition.prototype.isWorking = function() {
	return (this.intervalId != null);
};

/**
Returns current X value, always within [0; 1] bounds.
@return :Number current X
*/
s7js.flyout.Transition.prototype.getX = function() {
	return this.x;
};

/**
Returns current value.
@return :Number current value
*/
s7js.flyout.Transition.prototype.getValue = function() {
	return this.type.direct(this.x);
};

/**
Callback method, should be implemented by the client code. Called when transition starts, stops or value changes.
@param inTransition:CTransition self reference
*/
s7js.flyout.Transition.prototype.onChange = function(inTransition) {
};

s7js.flyout.Transition.prototype.toString = function() {
	return 'Transition[type:' + this.type + ']';
};

//PRIVATE METHODS.

s7js.flyout.Transition.prototype.validateType = function(inType) {
	if ((inType.direct == null) || !(inType.direct instanceof Function)) {
		s7js.flyout.Utils.log('type [' + inType + '] does not have direct transformation function');
		return false;
	}
	if ((inType.reverse == null) || !(inType.reverse instanceof Function)) {
		s7js.flyout.Utils.log('type [' + inType + '] does not have direct transformation function');
		return false;
	}
	if (SjUtils.floatCompare(inType.reverse(inType.direct(0)), 0) != 0) {
		s7js.flyout.Utils.log('type [' + inType + '] is not symmetric at 0: type.direct(0): ' + inType.direct(0) + ', type.reverse(' + inType.direct(0) + '): ' + inType.reverse(inType.direct(0)));
		return false;
	}
	if (SjUtils.floatCompare(inType.reverse(inType.direct(1)), 1) != 0) {
		s7js.flyout.Utils.log('type [' + inType + '] is not symmetric at 1: type.direct(1): ' + inType.direct(1) + ', type.reverse(' + inType.direct(1) + '): ' + inType.reverse(inType.direct(1)));
		return false;
	}
	return true;
};

s7js.flyout.Transition.prototype.doTransition = function() {
	var dt = (new Date()).getTime() - this.startTime;
	var animationTime = Math.abs(this.endX - this.startX) * this.totalTime;
	if (dt >= animationTime) {
		this.x = this.endX;
		clearInterval(this.intervalId);
		delete this.intervalId;
	} else {
		this.x = this.startX + (dt / animationTime) * (this.endX - this.startX);
	}
	this.onChange(this);
};

//////////////////////////////

/**
Linear transition type. The value is changed proportionally to the time within specified bounds.
*/
/**
Creates new CTransitionTypeLinear instance with given value bounds.
@param inStartValue:Number start value (corresponds to X=0), must be different from inEndValue
@param inEndValue:Number end value (corresponds to X=1), must be different from inStartValue
*/
s7js.flyout.TransitionTypeLinear = function(inStartValue, inEndValue) {
	if (inStartValue == inEndValue) {
		s7js.flyout.Utils.log('inStartValue [' + inStartValue + '] must not be equal inEndValue');
		return;
	}
	this.startValue = inStartValue;
	this.endValue = inEndValue;
	this.direct = function(inX) {
		return inStartValue + inX * (inEndValue - inStartValue);
	};
	this.reverse = function(inValue) {
		return (inValue - inStartValue) / (inEndValue - inStartValue);
	};
};

s7js.flyout.TransitionTypeLinear.prototype.toString = function() {
	return 'TransitionTypeLinear[startValue:' + this.startValue + ',endValue:' + this.endValue + ']';
};

//////////////////////////////

/**
Quadractic transition type. The value is changed according to polynome of power of 2 within given bounds. It is possible to specify whether 
transition speeds up or slows down towards the end.
*/
/**
Creates new CTransitionTypeQuadratic instance with given value bounds and speed up flag.
@param inStartValue:Number start value (corresponds to X=0), must be different from inEndValue
@param inEndValue:Number end value (corresponds to X=1), must be different from inStartValue
@param inSpeedUp:Boiolean if true, transition will speed up towards the end, otherwise it will slow down. Internally this specifies the location of the
parabola vertex. If true, parabola vertex is located at X=0, otherwise it is located at X=1
*/
s7js.flyout.TransitionTypeQuadratic = function(inStartValue, inEndValue, inSpeedUp) {
	if (inStartValue == inEndValue) {
		s7js.flyout.Utils.log('inStartValue [' + inStartValue + '] must not be equal inEndValue');
		return;
	}
	this.startValue = inStartValue;
	this.endValue = inEndValue;
	this.rightBranch = inSpeedUp;
	this.direct = function(inX) {
		if (inSpeedUp) {
			return inStartValue + inX * inX * (inEndValue - inStartValue);
		} else {
			var a = inStartValue - inEndValue;
			var b = 2 * (inEndValue - inStartValue);
			var c = inStartValue;
			return a * inX * inX + b * inX + c;
		}
	};
	this.reverse = function(inValue) {
		if (inSpeedUp) {
			return Math.pow((inValue - inStartValue) / (inEndValue - inStartValue), 0.5);
		} else {
			var a = inStartValue - inEndValue;
			var b = 2 * (inEndValue - inStartValue);
			var c = inStartValue;
			var D = b * b - 4 * a * (c - inValue);
			return Math.min((-b - Math.pow(D, 0.5)) / 2 / a, (-b + Math.pow(D, 0.5)) / 2 / a);
		}
	};
};

s7js.flyout.TransitionTypeQuadratic.prototype.toString = function() {
	return 'TransitionTypeQuadratic[startValue:' + this.startValue + ',endValue:' + this.endValue + ',rightBranch:' + this.rightBranch + ']';
};

/**
Exponential transition type. The value is changed according to exp(x) within given bounds. It is possible to specify whether 
transition speeds up or slows down towards the end and the slope for the "stop" point.
*/
/**
Creates new CTransitionTypeExp instance with given value bounds, speed up flag and the slop in "stop" point.
@param inStartValue:Number start value (corresponds to X=0), must be different from inEndValue
@param inEndValue:Number end value (corresponds to X=1), must be different from inStartValue
@param inSpeedUp:Boiolean if true, transition will speed up towards the end, otherwise it will slow down. Internally this specifies the location of the
"stop" point where the exponent slope will be equal to the one specified in inStopSlope. If true, "stop point" is located at X=0, otherwise it is located at X=1
@param inStopSlope:Number the value of exponent slope at the "stop point". Must be within (0; 1) bounds. The smaller is inStopSlope value, the smaller is speed
in "stop point". Suggested value is 0.1
*/
s7js.flyout.TransitionTypeExpInOut = function(inStartValue, inEndValue, inSpeedUp, inStopSlope) {
	if (inStartValue == inEndValue) {
		s7js.flyout.Utils.log('inStartValue [' + inStartValue + '] must not be equal inEndValue');
		return;
	}
	if ((inStopSlope <= 0) || (inStopSlope >= 1)) {
		s7js.flyout.Utils.log('inStopSlope [' + inStopSlope + '] must belong to (0; 1)');
		return;
	}

	this.startValue = inStartValue;
	this.endValue = inEndValue;
	this.speedUp = inSpeedUp;

	//general exp equation is defined as y = a * exp(b * x) + c. As long as one of edge conditions (inStopSlope) is defined for the derivative, such
	//equation (delta=b/(exp(b)-1)) cannot be solved analytically, thus we calculate 'b' using the method of binary search.
	var b1 = 0;
	var b2 = 1 / inStopSlope;
	var effectivePrecision = inStopSlope * s7js.flyout.TransitionTypeExpInOut.PRECISION;
	var b;
	var bFunc = function(inB) {
		return inB / (Math.exp(inB) - 1);
	};
	do {
		b = (b1 + b2) / 2;
		var res = bFunc(b);
		if (res > inStopSlope) {
			b1 = b;
		} else {
			b2 = b;
		}
	} while (Math.abs(res - inStopSlope) > effectivePrecision);
	//calculate other exponent coefficients
	var a = inStopSlope * (this.endValue - this.startValue) / b;
	var c = this.startValue - a;

	if (!this.speedUp) {
		//if we are in "slow down" mode use coefficients calculated for the default "speed up" mode (where the initial slope is defined) and flip the graph accordingly.
		a = - a / Math.exp(-b);
		b = -b;
		c = -c + this.startValue + this.endValue;
	}

	this.direct = function(inX) {
		return a * Math.exp(b * inX) + c;
	};
	this.reverse = function(inValue) {
		return Math.log((inValue - c) / a) / b;
	};
};

s7js.flyout.TransitionTypeExpInOut.PRECISION = 0.0001;

s7js.flyout.TransitionTypeExpInOut.prototype.toString = function() {
	return 'TransitionTypeExp[startValue:' + this.startValue + ',endValue:' + this.endValue + ',speedUp:' + this.speedUp + ']';
};

/**
Exponential ease/out transition type. The value is changed according to the two exp functions: the first half of the transition exponentinal slow-down effect is used,
the second half exponentinal spped up effect is used. It is possible to specify the slope for the "middle" point, where one transition changes to another.
*/
/**
Creates new CTransitionTypeExpInOut instance with given value bounds and the slop in "middle" point.
@param inStartValue:Number start value (corresponds to X=0), must be different from inEndValue
@param inEndValue:Number end value (corresponds to X=1), must be different from inStartValue
@param inSpeedUpMiddlePoint:Boiolean if true, transition will speed up towards the middle point, otherwise it will slow down in the middle. Internally this specifies the location of the
"stop" point where the exponent slope will be equal to the one specified in inStopSlope. If true, "stop point" is located at X=0.5, otherwise it is located at X=0 and X=1
@param inStopSlope:Number the value of exponent slope at the "stop point". Must be within (0; 1) bounds. The smaller is inStopSlope value, the smallers is speed
in "stop point". Suggested value is 0.1
*/
s7js.flyout.TransitionTypeExpInOut = function(inStartValue, inEndValue, inSpeedUpMiddlePoint, inStopSlope) {
	var midValue = (inStartValue + inEndValue) / 2;
	this.trans1 = new s7js.flyout.TransitionTypeExpInOut(inStartValue, midValue, inSpeedUpMiddlePoint, inStopSlope);
	this.trans2 = new s7js.flyout.TransitionTypeExpInOut(midValue, inEndValue, !inSpeedUpMiddlePoint, inStopSlope);
	
	var selfRef = this;
	this.direct = function(inX) {
		if (inX < 0.5) {
			return selfRef.trans1.direct(2 * inX);
		} else {
			return selfRef.trans2.direct(2 * (inX - 0.5));
		}
	};
	this.reverse = function(inValue) {
		if (((inStartValue < inEndValue) && (inValue < midValue)) || ((inStartValue > inEndValue) && (inValue > midValue))) {
			return selfRef.trans1.reverse(inValue) / 2;
		} else {
			return selfRef.trans2.reverse(inValue) / 2 + 0.5;
		}
	};
};

s7js.flyout.TransitionTypeExpInOut.prototype.toString = function() {
	return 'TransitionTypeExpInOut[startValue:' + this.trans1.startValue + ',endValue:' + this.trans2.endValue + ']';
};
