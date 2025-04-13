const xrpl = require("xrpl");
const {Account} = require('xrpl-secret-numbers');
const {textToHex} = require('./utilities/textToHex')

const account_one = new Account('486540 473460 284457 622694 374670 609954 325378 275700')
const account_two = new Account('394020 560246 157377 176008 215300 388668 174287 069886')
const account_three = new Account('467087 312896 177717 448937 608980 529017 376446 210150');

const wallet_one = xrpl.walletFromSecretNumbers(account_one.getSecret())
const wallet_two = xrpl.walletFromSecretNumbers(account_two.getSecret())
const wallet_three = xrpl.walletFromSecretNumbers(account_three.getSecret());

console.log(wallet_one.classicAddress)
console.log(wallet_two.classicAddress)

// Replace with your Crossmark wallet seed
const RLUSD_ISSUER = wallet_one.classicAddress; 
const RLUSD_RECIPIENT = wallet_three.classicAddress

async function sendRLUSD(from, to, amount) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const currencyCode = "RLUSD"
  let currencyHex;
  try {
    currencyHex = textToHex(currencyCode);
  } catch (error) {
    console.log(`Error: ${error.message}`);
    await client.disconnect();
    return;
  }

  const paymentTx = {
    TransactionType: "Payment",
    Account: from.classicAddress,
    Destination: to,
    Amount: {
      currency: currencyHex,
      issuer: from.classicAddress,
      value: amount,
    }
  };

  try {
    const prepared = await client.autofill(paymentTx);
    prepared.LastLedgerSequence += 20;
    const signed = from.sign(prepared);
    console.log("Submitting transaction...");
    const response = await client.submitAndWait(signed.tx_blob);

    const txResult = response.result.meta.TransactionResult;

    if (txResult === "tesSUCCESS") {
      console.log("RLUSD payment successful.");
      console.log(`Transaction hash: ${response.result.hash}`);
    } else {
      console.log("Payment failed.");
      console.log(response.result.meta.TransactionResult);
    }

    return response.result;
  } catch (error) {
    console.error("Payment Error:", error.message);
  } finally {
    await client.disconnect();
  }
}

// Run directly from CLI
if (require.main === module) {
  sendRLUSD(wallet_one, wallet_three.classicAddress, "300")
    .then(res => {
      if (res) {
        console.log("Payment Result:");
        console.log(JSON.stringify(res, null, 2));
      }
    })
    .catch(err => {
      console.error("Unhandled Payment Error:", err);
    });
}

module.exports = { sendRLUSD };