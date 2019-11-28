let publisher = require('@pact-foundation/pact-node');
let path = require('path');

let opts = {
  providerBaseUrl: 'http://localhost:82',
  pactFilesOrDirs: [path.resolve(process.cwd(), 'pacts')],
  pactBroker: 'http://localhost:82',
  // pactBrokerUsername: process.env.PACT_USERNAME,
  // pactBrokerPassword: process.env.PACT_PASSWORD,
  consumerVersionTag: 'prod',
  tags: ['prod'],
  consumerVersion: '2.1.0'
};

publisher
  .publishPacts(opts)
  .then(() => console.log('Pacts successfully published'));
