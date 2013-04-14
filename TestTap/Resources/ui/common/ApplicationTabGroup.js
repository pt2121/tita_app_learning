function ApplicationTabGroup(Window) {
	//create module instance
	var self = Ti.UI.createTabGroup();

	//create app tabs
	var homeWin = Ti.UI.createWindow({
		url : '/ui/common/home.js',
		title : L('home'),
		backgroundColor : '#000'
	});
	var profileWin = Ti.UI.createWindow({
		url : '/ui/common/foo.js',
		title : L('profile'),
		backgroundColor : '#F00'
	});
	var drawWin = Ti.UI.createWindow({
		url : '/ui/common/draw.js',
		title : L('draw'),
		backgroundColor : '#FFF'
	});

	var homeTab = Ti.UI.createTab({
		title : L('home'),
		icon : '/images/KS_nav_ui.png',
		window : homeWin
	});
	homeWin.containingTab = homeTab;
	var profileTab = Ti.UI.createTab({
		title : L('profile'),
		icon : '/images/KS_nav_views.png',
		window : profileWin
	});
	profileWin.containingTab = profileTab;
	var drawTab = Ti.UI.createTab({
		title : L('draw'),
		icon : '/images/KS_nav_views.png',
		window : drawWin
	});
	drawWin.containingTab = drawTab;

	self.addTab(homeTab);
	self.addTab(profileTab);
	self.addTab(drawTab);
	return self;
};

module.exports = ApplicationTabGroup;
