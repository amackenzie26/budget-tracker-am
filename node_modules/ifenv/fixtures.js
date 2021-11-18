const fs = require('fs');
const path = require('path');

const fixtures = fs
  .readdirSync(path.join(__dirname, 'fixtures'))
  .reduce((acc, name) => Object.assign(
    acc,
    { [name]: fs.readFileSync(path.join(__dirname, 'fixtures', name), 'utf-8') }
  ), {});

module.exports = fixtures;
