var store = require('app-store-scraper');
const fs = require('fs');
const papaparse = require('papaparse');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

//List appId
const idList = [
  1641486558, 983156458, 6446901002, 6448311069, 1060683933, 1113153706,
  632064380, 6450299650, 310633997, 585027354, 835599320, 284815942,
  1500855883, 1223471316, 686449807, 1629050566, 422689480, 951937596,
  878577184, 389801252, 544007664, 288429040, 1052238659, 368677368,
  932493382, 514561561, 367003839, 324684580, 284882215, 401626263, 288429040
  ,1064216828 ,543186831, 447188370, 512939461, 1351168404
];

let appIdList = [];

let objAppID = {
  appId: '',
  id: ''
}

for (const id of idList) {
  store
    .app({ id: id })
    .then(async (data) => {
      objAppID.appId = data.appId;
      objAppID.id = id;
      appIdList.push(objAppID);
      console.log(objAppID);
    })
    .catch((err) => {
      console.log("id", id);
      console.log(err)
    });
}
