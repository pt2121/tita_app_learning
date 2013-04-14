//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	//Ti.UI.setBackgroundColor('#FF0');
	//label using localization-ready strings from <app dir>/i18n/en/strings.xml
	var label = Ti.UI.createLabel({
		color:'#FF0000',
		text:String.format(L('hello'),'world'),
		height:100,
		width:100
	});
	self.add(label);
	
	//Add behavior for UI
	label.addEventListener('click', function(e) {
		alert(e.source.text);
	});
	
	return self;
}

module.exports = FirstView;
