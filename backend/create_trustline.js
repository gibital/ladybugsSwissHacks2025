const xrpl = require("xrpl");

const RLUSD_ISSUER = "rQhWctnUrjxNNEV3LwLmuwPbU1XPrEY9Vf"; // Replace with your RLUSD issuer address

async function createTrustline(secret) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(secret);

  const trustSet = {
    TransactionType: "TrustSet",
    Account: wallet.classicAddress,
    LimitAmount: {
      currency: "RLUSD",
      issuer: RLUSD_ISSUER,
      value: "100" // Arbitrary trust limit
    }
  };

  const prepared = await client.autofill(trustSet);
  prepared.LastLedgerSequence += 20;

  const signed = wallet.sign(prepared);
  const tx = await client.submitAndWait(signed.tx_blob);

  await client.disconnect();
  return tx.result;
}

if (require.main === module) {
  const secret = process.argv[2];
  if (!secret) {
    console.error("Usage: node create_trustline.js <walletSecret>");
    process.exit(1);
  }

  createTrustline(secret)
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .catch(err => console.error("Trustline Error:", err));
}

module.exports = { createTrustline };
