
// Convert a string (like RLUSD) to a 40-character uppercase hex string
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

  module.exports = { 
    textToHex
  };