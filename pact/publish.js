let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
  providerBaseUrl: 'http://pact_broker:80',
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://pact_broker:80',
  // pactBrokerUsername: process.env.PACT_USERNAME,
  // pactBrokerPassword: process.env.PACT_PASSWORD,
  consumerVersion: '2.0.0'
};

publisher
  .publishPacts(opts)
  .then(() => console.log('Pacts successfully published'));
