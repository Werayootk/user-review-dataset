var store = require('app-store-scraper');
const fs = require('fs');
const { promisify } = require('util');
const writeFileAsync = promisify(fs.writeFile);

//List appId
// const idList = [
//   1641486558, 983156458, 6446901002, 6448311069, 1060683933, 1113153706,
//   632064380, 6450299650, 310633997, 585027354, 835599320, 284815942,
//   1500855883, 1223471316, 686449807, 1629050566, 422689480, 951937596,
//   878577184, 389801252, 544007664, 288429040, 1052238659,
//   932493382, 514561561, 367003839, 324684580, 284882215
// ];

// const idList = [
//   368677368,
//   401626263,
//   288429040,
//   1064216828,
//   543186831
// ]


// let appIdList = [];
// for (const id of idList) {
//   store
//     .app({ id: id })
//     .then(async (data) => {
//       appIdList.push(data.appId);
//       console.log(appIdList, id);
//     })
//     .catch((err) => {
//       console.log("id", id);
//       console.log(err)
//     });
// }

const appIdList = [
  'com.einnovation.temu',
  'com.burbn.barcelona',
  'com.openai.chat',
  'com.microsoft.azureauthenticator',
  'com.burbn.instagram',
  'net.whatsapp.WhatsApp',
  'com.moonsted.TGTG',
  'uk.co.santander.oeuk.live',
  'com.microsoft.skype.teams',
  'com.google.GoogleMobile',
  'uk.gov.digital-identity',
  'com.zhiliaoapp.musically',
  'com.microsoft.Office.Outlook',
  'ph.telegra.Telegraph',
  'com.jadedlabs.arrive',
  'zzkko.com.ZZKKO',
  'com.google.ios.youtube',
  'com.google.Gmail',
  'com.lemon.lvoverseas',
  'lt.manodrabuziai.fr',
  'io.b2a.BankProd',
  'com.linkedin.LinkedIn',
  'com.revolut.revolut',
  'com.facebook.Facebook',
  'com.google.Maps',
  'com.spotify.client',
  'com.booking.BookingApp',
  'uk.gov.hmrc.TaxCalc',
  'com.linkedin.LinkedIn',
  'com.airbnb.app',
  'com.miniclip.8ballpoolmult',
  'com.ubercab.UberClient',
  'com.reddit.Reddit'
];

async function fetchAndAppendReviews(page, id) {
  try {
    const appId = id
    const res = await store.reviews({
      appId: appId,
      sort: store.sort.HELPFUL,
      page: page
    });

    const jsonContent = JSON.stringify(res);
    await writeFileAsync(`./out/output_page_${appId}_${page}.json`, jsonContent, 'utf8');
    console.log(`JSON file for page ${page} has been saved.`);
} catch (error) {
    console.error(`Error fetching or writing reviews for page ${page}:`, error);
}
}

async function processPages() {
  appIdList.forEach( async (appId) => {
    // Loop through pages 1 to 10
    for (let page = 1; page <= 10; page++) {
        await fetchAndAppendReviews(page, appId);
    }
  })
}

// Call the async function
processPages();
