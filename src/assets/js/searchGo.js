var fs = require('fs');

const mac_google_dirs = [

    '~/Applications/Google Chrome.app',
    '~/Downloads/Google Chrome.app',
    '~/Desktop/Google Chrome.app'
]


function searchGo() {

    if(fs.existsSync(mac_google_dirs[0])) {

        console.log('Google Chrome exists!!');

    } else {

        console.log('Google Chrome doesnt exists!!');
    }

}

searchGo();
