var store = require('app-store-scraper');
const fs = require('fs');
const papaparse = require('papaparse');
const { promisify } = require('util');

const writeFileAsync = promisify(fs.writeFile);

appIdList = [
  { appId: 'jp.naver.line', id: 443904275 },
  { appId: 'com.moxco.bumble', id: 930441707 },
  { appId: 'com.atebits.Tweetie2', id: 333903271 },
  { appId: 'com.niksoftware.snapseedforipad', id: 439438619 },
  { appId: 'com.netflix.NGP.GTAViceCityDefinitiveEdition', id: 6450280696 },
  { appId: 'com.facebook.Messenger', id: 454638411 },
  { appId: 'jp.co.ofcr.cm00', id: 987360477 },
  { appId: 'com.ketchapp.2048', id: 840919914 },
  { appId: 'com.childishthings.cricketcaptain2024', id: 6502348143 },
  { appId: 'com.tencent.ig', id: 1330123889 },
  { appId: 'com.namconetworks.pacmanlite', id: 293778748 },
  { appId: 'com.tencent.xin', id: 414478124 },
  { appId: 'com.authentificator.app', id: 6502047054 },
  { appId: 'me.mattrubin.authenticator', id: 766157276 },
  { appId: 'com.mcdonalds.mobileapp', id: 1217507712 },
  { appId: 'com.dts.freefiremax', id: 1480516829 },
  { appId: 'com.cardify.tinder', id: 547702041 },
  { appId: 'com.ea.ios.fifaultimate', id: 1127108818 },
  { appId: 'com.google.Movies', id: 746894884 },
  { appId: 'com.bigwinepot.nwdn.international', id: 1470373330 },
  { appId: 'com.cardify.tinder', id: 547702041 },
  { appId: 'com.google.ios.ytcreator', id: 888530356 },
  { appId: 'com.skysoft.removalfree', id: 1457711961 },
  { appId: 'com.hammerandchisel.discord', id: 985746746 }
];

async function fetchAndAppendReviews(page, appIdList) {
  try {
    const appId = appIdList.appId;
    const res = await store.reviews({
      appId: appId,
      sort: store.sort.RECENT,
      page: page
    });
    return await res;
  } catch (error) {
    console.error(`Error fetching or writing reviews for page ${page}:`, error);
  }
}

function processPages() {
  appIdList.forEach(async (appIdList) => {
    // Loop through pages 1 to 10
    for (let page = 1; page <= 10; page++) {
      const res = await fetchAndAppendReviews(page, appIdList);
      if (res?.length > 0) {
        let content = [];
        res.forEach(element => {
          if (element.score > 0) {
            content.push(element);
          }
        });
        // console.log("csvContent", csvContent);
        // Write CSV content to a file
        let csvContent = await papaparse.unparse(content);
        writeFileAsync(`./out/${appIdList.appId}_${appIdList.id}_${page}.csv`, csvContent, 'utf8');
        console.log(`CSV file for page ${page} has been saved.`);
      } else {
        continue;
      }
    }
  })
}

// Call the async function
processPages();
