const papa = require('papaparse');
const fs = require('fs');
const path = require('path');

const csvFile = fs.readFileSync(path.resolve('data', 'data.csv'), 'utf-8');

papa.parse(csvFile, {
  worker: true,
  step: function(results) {
    console.log(results.data);
  }
});
