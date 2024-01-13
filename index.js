var store = require('app-store-scraper');
const fs = require('fs');
const papaparse = require('papaparse');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

//List appId
// const idList = [
//   1641486558, 983156458, 6446901002, 6448311069, 1060683933, 1113153706,
//   632064380, 6450299650, 310633997, 585027354, 835599320, 284815942,
//   1500855883, 1223471316, 686449807, 1629050566, 422689480, 951937596,
//   878577184, 389801252, 544007664, 288429040, 1052238659, 368677368,
//   932493382, 514561561, 367003839, 324684580, 284882215, 401626263, 288429040
//   ,1064216828 ,543186831
// ];

let appIdList = [];
// let objAppID = {
//   appId: '',
//   id: ''
// }

// for (const id of idList) {
//   store
//     .app({ id: id })
//     .then(async (data) => {
//       objAppID.appId = data.appId;
//       objAppID.id = id;
//       appIdList.push(objAppID);
//       console.log(objAppID);
//     })
//     .catch((err) => {
//       console.log("id", id);
//       console.log(err)
//     });
// }

appIdList = [
  { appId: 'com.einnovation.temu', id: 1641486558 },
  { appId: 'com.burbn.barcelona', id: 6446901002 },
  { appId: 'com.microsoft.azureauthenticator', id: 983156458 },
  { appId: 'com.openai.chat', id: 6448311069 },
  { appId: 'com.moonsted.TGTG', id: 1060683933 },
  { appId: 'com.microsoft.skype.teams', id: 1113153706 },
  { appId: 'uk.co.santander.oeuk.live', id: 6450299650 },
  { appId: 'lt.manodrabuziai.fr', id: 632064380 },
  { appId: 'com.google.Maps', id: 585027354 },
  { appId: 'net.whatsapp.WhatsApp', id: 310633997 },
  { appId: 'com.google.GoogleMobile', id: 284815942 },
  { appId: 'com.zhiliaoapp.musically', id: 835599320 },
  { appId: 'ph.telegra.Telegraph', id: 686449807 },
  { appId: 'com.jadedlabs.arrive', id: 1223471316 },
  { appId: 'com.lemon.lvoverseas', id: 1500855883 },
  { appId: 'uk.gov.digital-identity', id: 1629050566 },
  { appId: 'com.microsoft.Office.Outlook', id: 951937596 },
  { appId: 'com.google.Gmail', id: 422689480 },
  { appId: 'zzkko.com.ZZKKO', id: 878577184 },
  { appId: 'uk.gov.hmrc.TaxCalc', id: 514561561 },
  { appId: 'com.burbn.instagram', id: 389801252 },
  { appId: 'com.revolut.revolut', id: 932493382 },
  { appId: 'com.facebook.Facebook', id: 284882215 },
  { appId: 'com.linkedin.LinkedIn', id: 288429040 },
  { appId: 'io.b2a.BankProd', id: 1052238659 },
  { appId: 'com.google.ios.youtube', id: 544007664 },
  { appId: 'com.linkedin.LinkedIn', id: 288429040 },
  { appId: 'com.booking.BookingApp', id: 367003839 },
  { appId: 'com.spotify.client', id: 324684580 },
  { appId: 'com.ubercab.UberClient', id: 368677368 },
  { appId: 'com.miniclip.8ballpoolmult', id: 543186831 },
  { appId: 'com.reddit.Reddit', id: 1064216828 },
  { appId: 'com.airbnb.app', id: 401626263 }
];

// async function fetchAndAppendReviews(page, id) {
//   try {
//     const appId = id
//     const res = await store.reviews({
//       appId: appId,
//       sort: store.sort.HELPFUL,
//       page: page
//     });

//     const jsonContent = JSON.stringify(res);
//     await writeFileAsync(`./out/output_page_${appId}_${page}.json`, jsonContent, 'utf8');
//     console.log(`JSON file for page ${page} has been saved.`);
    
// } catch (error) {
//     console.error(`Error fetching or writing reviews for page ${page}:`, error);
// }
// }

async function fetchAndAppendReviews(page, appIdList) {
  try {
    const appId = appIdList.appId;
    const res = await store.reviews({
      appId: appId,
      sort: store.sort.HELPFUL,
      page: page
    });

    // Convert reviews data to CSV format
    const csvContent = papaparse.unparse(res);

    // Write CSV content to a file
    await writeFileAsync(`./out/${appIdList.appId}_${appIdList.id}_${page}.csv`, csvContent, 'utf8');
    console.log(`CSV file for page ${page} has been saved.`);

  } catch (error) {
    console.error(`Error fetching or writing reviews for page ${page}:`, error);
  }
}

async function processPages() {
  appIdList.forEach( async (appIdList) => {
    // Loop through pages 1 to 10
    for (let page = 1; page <= 10; page++) {
        await fetchAndAppendReviews(page, appIdList);
    }
  })
}

// Call the async function
processPages();
