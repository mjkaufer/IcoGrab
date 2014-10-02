var request = require('request');
var fs = require('fs');
var savePath = "images/";

var header = {
	'User-Agent': 'IcoGrab'
};//universal header

var mkdir = function (path) {
  try {
    fs.mkdirSync(path);
  } catch(e) {
    //don't do anything - folder exists.
  }
}

function makeOptions(u){
	return {
		url:u,
		headers:header
	};
}

function grabIcon(username, force){//grabs the user's icon from GitHub and saves it in an images folder, if it's not already there - force is a bool whether or not to force overwrite



	var options = makeOptions('https://api.github.com/users/' + username);

	var callback = function(error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			var avatar = body.avatar_url;
			avatar = avatar.substring(0, avatar.indexOf("?"));

			var avOptions = makeOptions(avatar);
			request(avOptions, function(){
				console.log("Image saved");
			}).pipe(fs.createWriteStream(savePath + username + '.png'))

		}
	}

	request(options, callback);

}


mkdir(savePath);

grabIcon("mjkaufer",true);