const assert = require('assert');
const fs = require('fs');
const path = require('path');

const errors = require('../src').errors;
const UAPIParser = require('../src/Request/uapi-parser');

const xmlFolder = path.join(__dirname, '/FakeResponses');

describe('parser tests', () => {
  it('parse with errors', () => {
    const parser = new UAPIParser('someroot', 'v36_0');
    return parser.parseXML('adsdasds').then(() => {
      throw new Error('Error should be thrown');
    }, (err) => {
      assert(err instanceof errors.Request.RequestSoapError.SoapServerError);
    });
  });

  it('should detect error version automaticly', () => {
    const parser = new UAPIParser('someroot', 'v36_0');
    const xml = fs.readFileSync(path.join(xmlFolder, '/Other/UnableToFareQuoteError.xml'));
    return parser.parse(xml).then((obj) => {
      assert(parser.uapi_version === 'v33_0', 'Version is not overrided');
    });
  });
});
