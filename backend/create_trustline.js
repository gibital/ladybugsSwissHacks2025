const xrpl = require("xrpl");
const {Account} = require('xrpl-secret-numbers')

const SECRET = process.env.SECRET_ONE
console.log(SECRET)

const account_one = new Account('486540 473460 284457 622694 374670 609954 325378 275700')
const account_two = new Account('394020 560246 157377 176008 215300 388668 174287 069886')

const wallet_one = xrpl.walletFromSecretNumbers(account_one.getSecret())
const wallet_two = xrpl.walletFromSecretNumbers(account_two.getSecret())
const RLUSD_ISSUER = "rNfVS6kf2cfhrKNhCUr5gaKHADwSUMXJiK"; // Replace with your RLUSD issuer address
const RLUSD_RECIPIENT = "r9Mb1YcURav1o6Qmsa2KjtVDyFZXXY1bu1"

function textToHex(text) {
  if (text.length > 20) {
    throw new Error("Text must be 20 characters or less");
  }
  // Convert to hex
  let hexText = '';
  for (let i = 0; i < text.length; i++) {
    hexText += text.charCodeAt(i).toString(16).padStart(2, '0').toUpperCase();
  }
  // Pad with zeros to make it exactly 40 characters
  return hexText.padEnd(40, '0');
}



async function createTrustline(secret) {
  const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
  await client.connect();
  const currencyCode = "RLUSD"
  let currencyHex;
  try {
    currencyHex = textToHex(currencyCode);
  } catch (error) {
    console.log(`🚨 Error: ${error.message}`);
    await client.disconnect();
    return;
  }


  const trustSetTx = {
    TransactionType: "TrustSet",
    Account: RLUSD_RECIPIENT,
    LimitAmount: {
      currency: currencyHex,
      issuer: RLUSD_ISSUER,
      value: "500" // Arbitrary trust limit
    }
  };

  const prepared = await client.autofill(trustSetTx);
  prepared.LastLedgerSequence += 20;

  console.log("🚀 Submitting transaction...");
  try {
    const response = await client.submitAndWait(trustSetTx, {
      wallet: wallet_two
    });
    
    // Check the result
    const txResult = response.result.meta.TransactionResult;
    
    if (txResult === "tesSUCCESS") {
      console.log("\n✅ Trustline created successfully!");
      console.log(`  - Transaction hash: ${response.result.hash}`);
      console.log(`  - Wallet Address: ${wallet_two.address}`);
      console.log(`  - Wallet Seed: ${wallet_two.seed}`);
    } else {
      console.log("\n❌ Failed to create trustline");
      console.log(`  - Error: ${txResult}`);
    }
    } catch (error) {
      console.log(`\n🚨 Error creating trustline: ${error.message}`);
    } finally {
      await client.disconnect();
      console.log("🔌 Disconnected from the XRPL");
    }

    await client.disconnect();
    return tx.result;
  }

if (require.main === module) {
  const account = new Account('486540 473460 284457 622694 374670 609954 325378 275700')
  const secret = account.getSecret()
  if (!secret) {
    console.error("Usage: node create_trustline.js <walletSecret>");
    process.exit(1);
  }

  createTrustline(secret)
    .then(res => console.log(JSON.stringify(res, null, 2)))
    .catch(err => console.error("Trustline Error:", err));
}

module.exports = { createTrustline };
