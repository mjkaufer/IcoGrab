var unirest = require('unirest');
var http = require('http');	
var savePath = "/";

function grabIcon(username, force){//grabs the user's icon from GitHub and saves it in an images folder, if it's not already there - force is a bool whether or not to force overwrite
//TODO - implement a hash check to see if we need to update the image or no
//for now, we'll be content with simply getting the image

	unirest.get('https://api.github.com/users/' + username)
	.headers({'User-Agent':'Icon Grab'})
	.end(function(response){
		var avatar = response.body.avatar_url;
		avatar = avatar.substring(0, avatar.indexOf("?"));
		console.log(avatar);

	});

}

grabIcon("mjkaufer",true);