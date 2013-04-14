// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Titanium.UI.setBackgroundColor('#000');
 
 
//FACEBOOK CREDENTIAL
Titanium.Facebook.appid = "134793934930";
Titanium.Facebook.permissions = ['publish_stream', 'read_stream'];
 
//
// create root window
//
var win1 = Titanium.UI.createWindow({
    title:'Create Album and Post Photos in Facebook Using Titanium',
    backgroundColor:'#fff',
    tabBarHidden:true,
    navBarHidden:true
});
 
 
var title = Ti.UI.createLabel({
    text:'Create Album and Post Photos in Facebook Using Titanium',
    width:320,
    top:0,
    left:0,
    height:40,
    color:'#fff',
    backgroundColor:'#000',
    textAlign:'center',
    font:{fontSize:14, fontWeight:'bold', fontFamily:'Helvetica Neue'},
})
win1.add(title);
 
var button = Titanium.UI.createButton({
    color:'blue',
    title:'Login with Facebook',
    font:{fontSize:14, fontWeight:'bold', fontFamily:'Helvetica Neue'},
    textAlign:'rigth',
    width:170,
    height:35,
    top:50,
    right:5
});
 
win1.add(button);
 
var formContainer = Ti.UI.createView({
    backgroundColor:'#ccc',
    height:170,
    top:110,
    left:20,
    width:280,
    borderRadius:7,
    borderColor:'#999',
    borderWidth:1,
    visible:Titanium.Facebook.loggedIn
})
win1.add(formContainer);
 
var titleInput = Ti.UI.createTextField({
    hintText:'Album Title',
    backgroundColor:'#fff',
    borderRadius:5,
    borderColor:'#000',
    borderWidth:1,
    left:10,
    top:20,
    height:30,
    width:180,
    font:{fontSize:14, fontWeight:'normal', fontFamily:'Helvetica Neue'},
})
formContainer.add(titleInput);
 
var descInput = Ti.UI.createTextField({
    hintText:'Album Description',
    backgroundColor:'#fff',
    borderRadius:5,
    borderColor:'#000',
    borderWidth:1,
    left:10,
    top:80,
    height:30,
    width:180,
    font:{fontSize:14, fontWeight:'normal', fontFamily:'Helvetica Neue'},
})
formContainer.add(descInput);
 
var submitButton = Titanium.UI.createButton({
    color:'blue',
    title:'Create Album',
    font:{fontSize:14, fontWeight:'bold', fontFamily:'Helvetica Neue'},
    textAlign:'left',
    left:10,
    top:130,
    height:30,
    width:110
});
formContainer.add(submitButton);
 
win1.open();
 
button.addEventListener('click',function(e) {
	if(Titanium.Facebook.loggedIn){
		var logOutWarning = Titanium.UI.createAlertDialog({
			title: "",
			message: 'Are you sure want to Logout from Facebook',
			buttonNames: ['Yes', 'No'],
			cancel: 1
		});
		logOutWarning.show();
		
		logOutWarning.addEventListener('click', function(e) {
			if(e.index == 0){
			  Titanium.Facebook.logout();
			}
		});
	}else{
		Titanium.Facebook.authorize();
	}
});
 
 
submitButton.addEventListener('click',function(e) {
	var aTitle = titleInput.value;
	var aDescription = descInput.value;
	    var media = [];
	     
	for(var i=1; i<=3; i++){
		var file = Titanium.Filesystem.getFile(i+".jpg");
		var blob = file.read();
		media.push({'message': 'myPic', 'picture': blob});
	}
	createAlbum(media, aTitle, aDescription)
});
 
Titanium.Facebook.addEventListener('login', function(e) {
if (e.success) {
    alert('Successfully loggedin');
    button.title = "Logout from Facebook";
    formContainer.visible = true;
}else if (e.error) {
    alert("Error = "+e.error);
} else if (e.cancelled) {
    alert('cancelled');
}
     
});
 
 
Titanium.Facebook.addEventListener('logout', function(e) {
    alert('Successfully logged out from Facebook');
    button.title = "Login with Facebook";
    formContainer.visible = false;
});
 
 
function createAlbum(media, aTitle, aDescription) {
   Titanium.Facebook.requestWithGraphPath('me/albums', {name: aTitle, message: aDescription}, 'POST', function(e) {
   if(e.success) {
	   if(e.result) {
	        var response = JSON.parse(e.result);
	        var message;
			var path = response.id+'/photos';
		 
			for (var m = 0; m < media.length; m++){
				Titanium.Facebook.requestWithGraphPath(path, media[m], 'POST', function(e){
					if (e.success) {
					//message = "Successfully posted in Facebook";
					} else {
						if (e.error) {
						//message = e.error;
						} else {
						//message = "Unkown result";
						}
					}
				});
			}
			alert("Successfully posted in Facebook");
	   }
   } else if(e.cancelled) {
       Ti.API.debug("user cancelled");
   } else {
       Ti.API.debug(e.result);
   }
 
   });
}