const os = require("os");
const fs = require("fs");
const path = require("path");
const { spawn } = require("child_process");


var release_os = os.release(); // does not used it until the program is finished; 
var plataform_os = os.platform();

var dir_home = process.env [process.platform == "win32"?"USERPROFILE":"HOME"];
var dir_desktop = path.join(dir_home, "Desktop");
var admin_user = os.userInfo().username;
var user_data = []

function get_app_procces() {

 

}

function info_file() {

if(plataform_os === "darwin") {

    console.log("This user is OSX");
    fs.writeFile(dir_desktop + "/" + admin_user + ".txt", 'asdas', function(err) {
        if(err) {
           return console.log(err);
        } else {
            return console.log("The file was saved!!");
        }
        
    });
    
    
} else if(plataform_os === "win32") {

    console.log("This user is Windows");
    fs.writeFile(dir_desktop + "/" + admin_user + ".txt", 'testFile', function(err) {
        if(err) {
           return console.log(err);
        } else {
            return console.log("The file was saved!!");
        }
        
    });

} else if(plataform_os === "linux") {

    console.log("This user is Linux");
    fs.writeFile(dir_desktop + "/" + admin_user + ".txt", 'testFile', function(err) {
        if(err) {
           return console.log(err);
        } else {
            return console.log("The file was saved!!");
        }
        
    });

  }

}

info_file();