//FirstView Component Constructor
function FirstView() {
	//create object instance, a parasitic subclass of Observable
	var self = Ti.UI.createView();
	Ti.Geolocation.purpose = "wanna know where you are!";

	function translateErrorCode(code) {
		if (code == null) {
			return null;
		}
		switch (code) {
			case Ti.Geolocation.ERROR_LOCATION_UNKNOWN:
				return "Location unknown";
			case Ti.Geolocation.ERROR_DENIED:
				return "Access denied";
			case Ti.Geolocation.ERROR_NETWORK:
				return "Network error";
			case Ti.Geolocation.ERROR_HEADING_FAILURE:
				return "Failure to detect heading";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DENIED:
				return "Region monitoring access denied";
			case Ti.Geolocation.ERROR_REGION_MONITORING_FAILURE:
				return "Region monitoring access failure";
			case Ti.Geolocation.ERROR_REGION_MONITORING_DELAYED:
				return "Region monitoring setup delayed";
		}
	}

	var currentLocationLabel = Titanium.UI.createLabel({
		text : 'Current Location',
		font : {
			fontSize : 20,
			fontWeight : 'bold'
		},
		color : '#111',
		top : 70,
		left : 20,
		height : 40,
		width : 300
	});
	self.add(currentLocationLabel);

	var currentLocation = Titanium.UI.createLabel({
		text : 'Current Location not fired',
		font : {
			fontSize : 36
		},
		color : '#444',
		top : 200,
		left : 20,
		height : 100,
		width : 300
	});
	self.add(currentLocation);

	

	// state vars used by resume/pause
	var locationAdded = false;
	//
	//  SHOW CUSTOM ALERT IF DEVICE HAS GEO TURNED OFF
	//
	if (Titanium.Geolocation.locationServicesEnabled === false) {
		Titanium.UI.createAlertDialog({
			title : 'Location',
			message : 'Your device has geo turned off - turn it on.'
		}).show();
	} else {
		if (Titanium.Platform.name != 'android') {
			var authorization = Titanium.Geolocation.locationServicesAuthorization;
			Ti.API.info('Authorization: ' + authorization);
			if (authorization == Titanium.Geolocation.AUTHORIZATION_DENIED) {
				Ti.UI.createAlertDialog({
					title : 'Kitchen Sink',
					message : 'You have disallowed Titanium from running geolocation services.'
				}).show();
			} else if (authorization == Titanium.Geolocation.AUTHORIZATION_RESTRICTED) {
				Ti.UI.createAlertDialog({
					title : 'Kitchen Sink',
					message : 'Your system has disallowed Titanium from running geolocation services.'
				}).show();
			}
		}

		//
		//  SET ACCURACY - THE FOLLOWING VALUES ARE SUPPORTED
		//
		// Titanium.Geolocation.ACCURACY_BEST
		// Titanium.Geolocation.ACCURACY_NEAREST_TEN_METERS
		// Titanium.Geolocation.ACCURACY_HUNDRED_METERS
		// Titanium.Geolocation.ACCURACY_KILOMETER
		// Titanium.Geolocation.ACCURACY_THREE_KILOMETERS
		//
		Titanium.Geolocation.accuracy = Titanium.Geolocation.ACCURACY_BEST;
	}

	//
	// GET CURRENT POSITION - THIS FIRES ONCE
	//
	Titanium.Geolocation.getCurrentPosition(function(e) {
		if (!e.success || e.error) {
			currentLocation.text = 'error: ' + JSON.stringify(e.error);
			Ti.API.info("Code translation: " + translateErrorCode(e.code));
			alert('error ' + JSON.stringify(e.error));
			return;
		}

		var longitude = e.coords.longitude;
		var latitude = e.coords.latitude;
		var altitude = e.coords.altitude;
		var heading = e.coords.heading;
		var accuracy = e.coords.accuracy;
		var speed = e.coords.speed;
		var timestamp = e.coords.timestamp;
		var altitudeAccuracy = e.coords.altitudeAccuracy;
		Ti.API.info('speed ' + speed);
		currentLocation.text = 'long:' + longitude + ' lat: ' + latitude;

		Titanium.API.info('geo - current location: ' + new Date(timestamp) + ' long ' + longitude + ' lat ' + latitude + ' accuracy ' + accuracy);
	});
	return self;
}

module.exports = FirstView;

/*
 
 var forwardGeoLabel = Titanium.UI.createLabel({
		text : 'Forward Geo (Addr->Coords)',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#111',
		top : 250,
		left : 10,
		height : 15,
		width : 300
	});
	self.add(forwardGeoLabel);

	var forwardGeo = Titanium.UI.createLabel({
		text : '',
		font : {
			fontSize : 11
		},
		color : '#444',
		top : 270,
		left : 10,
		height : 15,
		width : 300
	});
	self.add(forwardGeo);

	var reverseGeoLabel = Titanium.UI.createLabel({
		text : 'Reverse Geo (Coords->Addr)',
		font : {
			fontSize : 12,
			fontWeight : 'bold'
		},
		color : '#111',
		top : 290,
		left : 10,
		height : 15,
		width : 300
	});
	self.add(reverseGeoLabel);

	var reverseGeo = Titanium.UI.createLabel({
		text : '',
		font : {
			fontSize : 11
		},
		color : '#444',
		top : 310,
		left : 10,
		height : 15,
		width : 300
	});
	self.add(reverseGeo);
	
 var addr = "2065 Hamilton Avenue San Jose California 95125";

Titanium.Geolocation.forwardGeocoder(addr,function(evt)
{
	Ti.API.info('in forward ');
	forwardGeo.text = "lat:"+evt.latitude+", long:"+evt.longitude;
	Titanium.Geolocation.reverseGeocoder(evt.latitude,evt.longitude,function(evt)
	{
		if (evt.success) {
			var text = "";
			for (var i = 0; i < evt.places.length; i++) {
				text += "" + i + ") " + evt.places[i].address + "\n";
			}
			Ti.API.info('Reversed forward: '+text);
		}
		else {
			Ti.UI.createAlertDialog({
				title:'Forward geo error',
				message:evt.error
			}).show();
			Ti.API.info("Code translation: "+translateErrorCode(e.code));
		}
	});
}); 

 
 */
