var store = require('app-store-scraper');
const fs = require('fs');
const papaparse = require('papaparse');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

//List appId
const idList = [
  1547798532,1217507712,443904275,1127108818,1077828937,439438619,1457711961,6502348143,994494368,1545140323,
  58023433,6450280696,987360477,766157276,414478124,930441707,888530356,6502047054,1480516829,454638411,
  547702041,746894884,547702041,293778748,630119301,840919914,1330123889,1470373330,333903271,1436799971,985746746
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
      console.log("Error id", id);
      // console.log(err)
    });
}
