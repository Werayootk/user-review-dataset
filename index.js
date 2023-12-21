var store = require('app-store-scraper');
const fs = require('fs');

store.app({ id: 553834731 }).then((res) => {
  // stringify JSON Object
  var jsonContent = JSON.stringify(res);
  fs.writeFile('./out/output.json', jsonContent, 'utf8', function (err) {
    if (err) {
      console.log('An error occured while writing JSON Object to File.');
      return console.log(err);
    } else {
        console.log('JSON file has been saved.');
    }
  });
});
