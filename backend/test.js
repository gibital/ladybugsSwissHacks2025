const { walletFromSecretNumbers } = require('xrpl');

const secretNumbers = [
  "394020", "560246", "157377", "176008",
  "215300", "388668", "174287", "069886"
];

const wallet = walletFromSecretNumbers(secretNumbers);

console.log("Address:", wallet.address);
console.log("Public Key:", wallet.publicKey);
console.log("Private Key:", wallet.privateKey);
