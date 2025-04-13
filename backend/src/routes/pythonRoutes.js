const express = require('express');
const { spawn, exec } = require('child_process');

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

router.post('/updateCreditScore', (req, res) => {
  const wallet = req.body.wallet_address
  if (!isValidWallet(wallet)) {
    return res.status(400).json({ error: 'Invalid XRP wallet address.' });
  }

  runPythonScript('fetch_wallet_data.py', [wallet], (err, output) => {
  });
  runPythonScript('analyze_wallet.py', [wallet], (err, output) => {
      const json = JSON.parse(output);
      return res.status(200).json(json);
  });
})

// router.get('/report/:wallet', (req, res) => {
//   const wallet = req.params.wallet;

//   if (!isValidWallet(wallet)) {
//     return res.status(400).json({ error: 'Invalid XRP wallet address.' });
//   }

//   runPythonScript('fetch_wallet_data.py', [wallet], (err, output) => {
//     if (err) return res.status(500).json({ error: err.message });
//     res.json({ message: 'Wallet data fetched successfully.', logs: output });
//   });
// });

// router.get('/analyze', (req, res) => {
//     console.log(" Running analyze_wallet.py...");
//     runPythonScript('analyze_wallet.py', [], (err, output) => {
//       if (err) return res.status(500).json({ error: err.message });
//       try {
//         const json = JSON.parse(output);
//         res.status(200).json(json);
//       } catch (e) {
//         res.status(500).json({ error: 'Invalid JSON output', raw: output });
//       }
//     });
//   });
  

module.exports = router;
