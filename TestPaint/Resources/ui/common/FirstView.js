//FirstView Component Constructor
function FirstView() {
	Titanium.Painter = require("ti.paint");
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	var paintView = Titanium.Painter.createPaintView({
		top : 0,
		right : 0,
		bottom : 100,
		left : 0,
		// strokeWidth (float), strokeColor (string), strokeAlpha (int, 0-255)
		strokeColor : '#0f0',
		strokeAlpha : 255,
		strokeWidth : 10,
		eraseMode : false
	});
	self.add(paintView);

	var strokeSlider = Titanium.UI.createSlider({
		left : '10dp',
		bottom : '10dp',
		right : '10dp',
		height : '30dp',
		min : 0,
		max : 50,
		value : 20
	});

	var label = Ti.UI.createLabel({
		text : 'Stroke Width',
		font : {
			fontSize : '10dp'
		},
		width : '100%',
		height : 'auto',
		top : 30,
		left : 0,
		textAlign : Ti.UI.TEXT_ALIGNMENT_CENTER
	});

	strokeSlider.addEventListener('change', function(e) {
		label.text = 'Stroke Width ' + String.format("%3.1f", e.value);
		paintView.strokeWidth = e.value;
	});
	
	self.add(strokeSlider);
	
	/*
	var buttonStrokeWidth = Ti.UI.createButton({
		left : 10,
		bottom : 10,
		right : 10,
		height : 30,
		font : {
			fontSize : '10dp'
		},
		title : 'Decrease Stroke Width'
	});
	buttonStrokeWidth.addEventListener('click', function(e) {
		paintView.strokeWidth = (paintView.strokeWidth === 10) ? 5 : 10;
		e.source.title = (paintView.strokeWidth === 10) ? 'Decrease Stroke Width' : 'Increase Stroke Width';
	});
	self.add(buttonStrokeWidth);
	*/
	
	var buttonStrokeColorRed = Ti.UI.createButton({
		bottom : '100dp',
		left : '10dp',
		width : '75dp',
		height : '30dp',
		font : {
			fontSize : '10dp'
		},
		title : 'Red'
	});
	buttonStrokeColorRed.addEventListener('click', function() {
		paintView.strokeColor = 'red';
	});
	var buttonStrokeColorGreen = Ti.UI.createButton({
		bottom : '70dp',
		left : '10dp',
		width : '75dp',
		height : '30dp',
		font : {
			fontSize : '10dp'
		},
		title : 'Green'
	});
	buttonStrokeColorGreen.addEventListener('click', function() {
		paintView.strokeColor = '#0f0';
	});
	var buttonStrokeColorBlue = Ti.UI.createButton({
		bottom : '40dp',
		left : '10dp',
		width : '75dp',
		height : '30dp',
		font : {
			fontSize : '10dp'
		},
		title : 'Blue'
	});
	buttonStrokeColorBlue.addEventListener('click', function() {
		paintView.strokeColor = '#0000ff';
	});
	self.add(buttonStrokeColorRed);
	self.add(buttonStrokeColorGreen);
	self.add(buttonStrokeColorBlue);

	var clear = Ti.UI.createButton({
		bottom : '40dp',
		left : '100dp',
		width : '75dp',
		height : '30dp',
		font : {
			fontSize : '10dp'
		},
		title : 'Clear'
	});
	clear.addEventListener('click', function() {
		paintView.clear();
	});
	self.add(clear);

	var buttonStrokeAlpha = Ti.UI.createButton({
		bottom : '70dp',
		right : '10dp',
		width : '100dp',
		height : '30dp',
		font : {
			fontSize : '10dp'
		},
		title : 'Alpha : 100%'
	});
	buttonStrokeAlpha.addEventListener('click', function(e) {
		paintView.strokeAlpha = (paintView.strokeAlpha === 255) ? 127 : 255;
		e.source.title = (paintView.strokeAlpha === 255) ? 'Alpha : 100%' : 'Alpha : 50%';
	});
	self.add(buttonStrokeAlpha);

	var buttonStrokeColorEraser = Ti.UI.createButton({
		bottom : '40dp',
		right : '10dp',
		width : '100dp',
		height : '30dp',
		font : {
			fontSize : '10dp'
		},
		title : 'Erase : Off'
	});
	buttonStrokeColorEraser.addEventListener('click', function(e) {
		paintView.eraseMode = (paintView.eraseMode) ? false : true;
		e.source.title = (paintView.eraseMode) ? 'Erase : On' : 'Erase : Off';
	});
	self.add(buttonStrokeColorEraser);

	return self;
}

module.exports = FirstView;
