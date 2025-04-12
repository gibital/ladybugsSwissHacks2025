const express = require('express');
const xrpl = require('xrpl');

const router = express.Router();

function isValidWallet(address) {
  return (
    typeof address === 'string' &&
    address.startsWith('r') &&
    address.length >= 25 &&
    address.length <= 35
  );
}

router.get('/balance/:wallet', async (req, res, next) => {
  const wallet = req.params.wallet;

  if (!isValidWallet(wallet)) {
    return res.status(400).json({ error: 'Invalid XRP wallet address.' });
  }

  const client = new xrpl.Client('wss://s2.ripple.com');

  try {
    await client.connect();

    const accountInfo = await client.request({
      command: 'account_info',
      account: wallet,
      ledger_index: 'validated',
    });

    const tokenBalances = await client.request({
      command: 'account_lines',
      account: wallet,
      ledger_index: 'validated',
    });

    res.json({
      accountInfo: accountInfo.result,
      tokenBalances: tokenBalances.result,
    });
  } catch (error) {
    console.error('Error querying XRP Ledger:', error);
    next(error);
  } finally {
    await client.disconnect();
  }
});

module.exports = router;
