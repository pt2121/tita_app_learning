//FirstView Component Constructor
function FirstView() {
	Titanium.Painter = require("ti.paint");
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();

	var paintView = Titanium.Painter.createPaintView({
		top : 0,
		left : 0,
		right : 0,
		bottom : 0,
		strokeColor : '#0f0',
		strokeAlpha : 255,
		strokeWidth : 10
	});
	
	self.add(paintView);
	
	return self;
}

module.exports = FirstView;
