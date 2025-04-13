const xrpl = require("xrpl");

// Replace with your Crossmark wallet seed
const CROSSMARK_SECRET = "002359D1555AD3023FB906FAD6D0C2FE75D705C0EAB7B097E9D2F107560B34FE9E"; // Get this from Crossmark export
const RLUSD_ISSUER = "rQhWctnUrjxNNEV3LwLmuwPbU1XPrEY9Vf"; 

async function sendRLUSD(to, amount) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const wallet = xrpl.Wallet.fromSeed(CROSSMARK_SECRET);

  const payment = {
    TransactionType: "Payment",
    Account: wallet.classicAddress,
    Destination: to,
    Amount: {
      currency: "RLUSD",
      issuer: RLUSD_ISSUER,
      value: amount,
    }
  };

  const prepared = await client.autofill(payment);
  prepared.LastLedgerSequence += 20;

  const signed = wallet.sign(prepared);
  const tx = await client.submitAndWait(signed.tx_blob);

  await client.disconnect();
  return tx;
}

// Support CLI execution for testing
if (require.main === module) {
  const [to, amount] = process.argv.slice(2);
  sendRLUSD(to, amount)
    .then(tx => console.log(JSON.stringify(tx.result, null, 2)))
    .catch(err => console.error("RLUSD TX failed", err));
}

module.exports = { sendRLUSD };
