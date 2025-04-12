const express = require('express');
const xrpl = require('xrpl');

const app = express();

// Middleware to parse JSON bodies from incoming requests
app.use(express.json());

/**
 * Helper function to validate a basic XRP wallet address format.
 * This example checks that the address is a string that begins with "r" 
 * and has a length between 25 and 35 characters.
 */
function isValidWallet(address) {
  return (
    typeof address === 'string' &&
    address.startsWith('r') &&
    address.length >= 25 &&
    address.length <= 35
  );
}

/**
 * GET /api/balance/:wallet endpoint
 * This endpoint connects to the XRP Ledger, retrieves account information,
 * and returns both the main account info and the token/trustline data.
 */
app.get('/api/balance/:wallet', async (req, res, next) => {
  const wallet = req.params.wallet;

  // Validate the wallet address format
  if (!isValidWallet(wallet)) {
    return res.status(400).json({ error: 'Invalid XRP wallet address.' });
  }

  const client = new xrpl.Client('wss://s2.ripple.com');

  try {
    // Connect to the XRP Ledger
    await client.connect();

    // Fetch account info (includes XRP balance)
    const accountInfo = await client.request({
      command: 'account_info',
      account: wallet,
      ledger_index: 'validated',
    });

    // Fetch trust lines (for issued tokens)
    const tokenBalances = await client.request({
      command: 'account_lines',
      account: wallet,
      ledger_index: 'validated',
    });

    // Return the fetched data in JSON format
    res.json({
      accountInfo: accountInfo.result,
      tokenBalances: tokenBalances.result,
    });
  } catch (error) {
    console.error('Error querying XRP Ledger:', error);
    // Pass the error to Express's default error handler
    next(error);
  } finally {
    await client.disconnect();
  }
});

// Basic error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: err.message });
});

module.exports = app;