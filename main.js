var request = require("request");
var fs = require("fs");
var savePath = "images/";

var header = {
	"User-Agent": "IcoGrab"
}; //universal header

function mkdir(path) {
	try {
		fs.mkdirSync(path);
	} catch (e) {
		//don't do anything - folder exists.
	}
}

function makeOptions(u) {
	return {
		url: u,
		headers: header
	};
}

function path(username) { //hassle-free way to generate the paths
	return savePath + username + ".jpg"; //.png was breaking for some images
}

function grabIcon(username, force, callback) { //grabs the user's icon from GitHub and saves it in an images folder, if it's not already there - force is a bool whether or not to force overwrite
	force = force || false; //default to no force, meaning won't overwrite images if it exists already - will save time and resources, etc.

	if (!force && fs.existsSync(path(username))) { //if the user doesn't want to force override and the file exists
		console.log("Image " + username + ".png exists!")
		return; //stop doing stuff - we don't want to overwrite
	}

	var options = makeOptions("https://api.github.com/users/" + username);

	var callback = function(error, response, body) {
		if (!error && response.statusCode == 200) {
			body = JSON.parse(body);
			var avatar = body.avatar_url;
			avatar = avatar.substring(0, avatar.indexOf("?")); //gets rid of the stuff at the end, just in case

			var avOptions = makeOptions(avatar);

			request(avOptions, function() {
				console.log("Image " + path(username) + " saved");
				callback(username);
			}).pipe(fs.createWriteStream(path(username)));

		}
	};

	request(options, callback);

}


mkdir(savePath);

grabIcon("mjkaufer", true);
grabIcon("pwstegman", true);