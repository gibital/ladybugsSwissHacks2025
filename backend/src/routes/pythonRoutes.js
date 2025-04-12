const express = require('express');
const { exec } = require('child_process');

const router = express.Router();

function isValidWallet(address) {
  return (
    typeof address === 'string' &&
    address.startsWith('r') &&
    address.length >= 25 &&
    address.length <= 35
  );
}

function runPythonScript(scriptPath, args = [], callback) {
  const command = `python3 ${scriptPath} ${args.join(' ')}`;
  exec(command, (error, stdout, stderr) => {
    if (error) return callback(error, null);
    if (stderr) return callback(new Error(stderr), null);
    callback(null, stdout);
  });
}

router.get('/report/:wallet', (req, res) => {
  const wallet = req.params.wallet;

  if (!isValidWallet(wallet)) {
    return res.status(400).json({ error: 'Invalid XRP wallet address.' });
  }

  runPythonScript('fetch_wallet_data.py', [wallet], (err, output) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: 'Wallet data fetched successfully.', logs: output });
  });
});

router.get('/analyze', (req, res) => {
  runPythonScript('analyze_wallet.py', [], (err, output) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ analysis: output });
  });
});

module.exports = router;
