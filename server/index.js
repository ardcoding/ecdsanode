const express = require("express");
const app = express();
const cors = require("cors");
const port = 3042;

app.use(cors());
app.use(express.json());

const balances = {
  "028fe49e78bd6ec5363b50201a7726c12c9bdb077ca085f188bec915ccb6bfb884": 100,//private : a123ddf361dafbcebb7365e3ce642a46febb3977ad59ab7cf4622463d524c484
  "039fffc037c920413d5524af15165bee5f02cd6e5e1b0f758c517654af58dbbf93": 50, //private : cbb1d5b741134ed25f1e5b1f8cca2062cbe3bb5ea21b418ccb8cb3ff6ad192ea
  "029dc899cfd77fd416179918b0922857bfb0ca4c8a8ac85f977bc351c0f379de38": 75, //private : 9e76a741e09338edfd97eb7335d92022ddcd0e08f6f90244402460d58d522751
};

app.get("/balance/:address", (req, res) => {
  const { address } = req.params;
  const balance = balances[address] || 0;
  res.send({ balance });
});

app.post("/send", (req, res) => {

  //TODO:
  // get a signature from the client-side application
  // recover the public address from the signature

  const { sender, recipient, amount } = req.body;

  setInitialBalance(sender);
  setInitialBalance(recipient);

  if (balances[sender] < amount) {
    res.status(400).send({ message: "Not enough funds!" });
  } else {
    balances[sender] -= amount;
    balances[recipient] += amount;
    res.send({ balance: balances[sender] });
  }
});

app.listen(port, () => {
  console.log(`Listening on port ${port}!`);
});

function setInitialBalance(address) {
  if (!balances[address]) {
    balances[address] = 0;
  }
}
