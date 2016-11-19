const GoogleSpreadsheet = require('google-spreadsheet');
const sheetID = require('./google-sheet-id');
const creds = require('./google-generated-creds.json');

const doc = new GoogleSpreadsheet(sheetID);

module.exports = (data, res) => {
  doc.useServiceAccountAuth(creds, () => {
    const sheet = 1;

    doc.getInfo((err, info) =>
      console.log(`Loaded doc: ${info.title} by ${info.author.email}`)
    );

    doc.getRows(sheet, (err, row_data) =>
      console.log(`pulled in ${row_data.length} rows`)
    );

    doc.addRow(sheet, data, () => res.send('saved'));
  });
};