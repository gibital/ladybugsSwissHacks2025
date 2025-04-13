const express = require("express");
const { sendRLUSD } = require("../../send_rlusd");
const router = express.Router();

router.post("/send-rlusd", async (req, res) => {
  const { to, amount } = req.body;

  if (!to || !amount) {
    return res.status(400).json({ error: "Missing 'to' or 'amount'" });
  }

  try {
    const tx = await sendRLUSD(to, amount);
    res.json({ success: true, tx });
  } catch (err) {
    console.error(" RLUSD TX Error:", err);
    res.status(500).json({ error: "RLUSD transaction failed", details: err.message });
  }
});

module.exports = router;
