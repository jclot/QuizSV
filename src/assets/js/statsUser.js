var { userInfo } = require("os");
var fs = require("fs");
var { join } = require("path");
var find = require('find-process');

var dir_home = process.env [process.platform == "win32"?"USERPROFILE":"HOME"];
var dir_desktop =  join(dir_home, "Desktop");
var admin_user = userInfo().username;
var arr = ['Google Chrome', 'Safari', 'Spotify', 'WhatsApp Desktop'];

let result;

function true_false(list) {

    if(list.length > 0) {

        result = "true";

    } else if(list.length <= 0) {

        result = "false";

    }

    return result;

}


function get_app_procces() {

    var safari = '  ||  ' +  arr[1] + ' = ';
    var google_chrome = ' ||  ' + arr[0] + ' = ';
    var spotify = ' || ' + arr[2] + ' = ';
    var whatsapp_desktop = ' || ' + arr[3] + ' = ';


    find('name', arr[1], true)
      .then(function (list) {


            true_false(list)

                fs.writeFile(dir_desktop + '/' + admin_user + '.txt',  Encrypt(safari + result ), function(err) {
              if(err) {
                  console.log(err);
              } else {
                  console.log('Sucefully Created!!');
              }
          });
      });

    find('name', arr[0], true)
      .then(function (list) {

            true_false(list)

                fs.appendFile(dir_desktop + '/' + admin_user + '.txt', Encrypt(google_chrome + result), function(err) {
              if(err) {
                  console.log(err);
              } else {
                  console.log('Sucefully Append File');
              }
          });
      });
    
    find('name', arr[2], true)
      .then(function (list) {

            true_false(list)

                fs.appendFile(dir_desktop + '/' + admin_user + '.txt', Encrypt(spotify + result), function(err){
              if(err) {
                  console.log(err);
              } else {
                  console.log("Succefully Append second file");
              }
          });
      });
    
    find('name', arr[3], true)
      .then(function (list) {

           true_false(list)

                fs.appendFile(dir_desktop + '/' + admin_user + '.txt',  Encrypt(whatsapp_desktop + result), function(err){
              if(err) {
                  console.log(err);
              } else {
                  console.log("Sucefully Append third file");
              }
          });
      });
}

var letters = 'abcdefghijklmnopqrstuvwxyz';

function Encrypt(params){
	var t = params.toLowerCase();
	var outt = "";
	var needseparator = false;
	for (var i = 0, len = t.length; i < len; i++) {
		var l = t[i];
		var idx = letters.indexOf(l);
		if (-1 == idx) {
			outt += l;
			needseparator = false;
		} else {
			if (needseparator) outt += "-";
			outt += (idx + 1).toString();
			needseparator = true;
		}
	}
	return outt;
}

document.getElementById('generateBtn').addEventListener('click', () => {

    get_app_procces();z
    setTimeout(() => { console.log(Encrypt(fs.readFileSync(dir_desktop + '/' + admin_user + '.txt', {encoding: 'utf-8'}))); }, 3000)

})




    
   

