const xrpl = require("xrpl");
const {Account} = require('xrpl-secret-numbers')
const {textToHex} = require('./utilities/textToHex')



// Secret Number Wallets
const account_one = new Account("486540 473460 284457 622694 374670 609954 325378 275700");
const account_two = new Account("394020 560246 157377 176008 215300 388668 174287 069886");
const account_three = new Account("467087 312896 177717 448937 608980 529017 376446 210150");

const wallet_one = xrpl.walletFromSecretNumbers(account_one.getSecret());
const wallet_two = xrpl.walletFromSecretNumbers(account_two.getSecret());
const wallet_three = xrpl.walletFromSecretNumbers(account_three.getSecret());

// RLUSD settings
const RLUSD_ISSUER = "rNfVS6kf2cfhrKNhCUr5gaKHADwSUMXJiK"; // RLUSD Issuer
const RLUSD_RECIPIENT = wallet_three.classicAddress; // Wallet that will receive trustline

// Create RLUSD Trustline
async function createTrustline(secret) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();

  const currencyCode = "RLUSD";
  let currencyHex;
  try {
    currencyHex = textToHex(currencyCode);
  } catch (error) {
    console.log(`Error converting currency: ${error.message}`);
    await client.disconnect();
    return;
  }

  const trustSetTx = {
    TransactionType: "TrustSet",
    Account: RLUSD_RECIPIENT,
    LimitAmount: {
      currency: currencyHex,
      issuer: RLUSD_ISSUER,
      value: "500"
    }
  };

  try {
    const prepared = await client.autofill(trustSetTx);
    prepared.LastLedgerSequence += 20;

    console.log("Submitting transaction...");
    const response = await client.submitAndWait(prepared, {
      wallet: wallet_three
    });


    const txResult = response.result.meta.TransactionResult;

    if (txResult === "tesSUCCESS") {
      console.log("Trustline created successfully");
      console.log(`Transaction hash: ${response.result.hash}`);
      console.log(`Wallet Address: ${wallet_two.address}`);
      console.log(`Wallet Seed: ${wallet_two.seed}`);
    } else {
      console.log("Failed to create trustline");
      console.log(`Error: ${txResult}`);
    }

    return response.result;

  } catch (error) {
    console.log(`Error creating trustline: ${error.message}`);
  } finally {
    await client.disconnect();
    console.log("Disconnected from XRPL");
  }
}

// CLI runner
if (require.main === module) {
  const account = new Account("486540 473460 284457 622694 374670 609954 325378 275700");
  const secret = account.getSecret();

  if (!secret) {
    console.error("Missing wallet secret");
    process.exit(1);
  }

  createTrustline(secret)
    .then(res => {
      if (res) {
        console.log("Final Result:");
        console.log(JSON.stringify(res, null, 2));
      }
    })
    .catch(err => console.error("Trustline Error:", err));
}