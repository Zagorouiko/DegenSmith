const IpfsClient = require('ipfs-http-client');

async function createIPFSClient() {
    // The Buffer.from function wasn't returning the correct token, not sure why, figure out later.
    const auth = 'Basic Mk9UbkJCeTBtQ3lObTF1NVlvNENCUVR5VmppOjY5ZWNjOWZkYTRjMzUxZDAzZGY0N2I3YTY0YTgwNDE5'
    //
const Client = IpfsClient.create({
    host: 'ipfs.infura.io',
    port: 5001,
    protocol: 'https',
    headers: {
        authorization: auth,
    },
  })
    return Client
}

module.exports = { createIPFSClient }