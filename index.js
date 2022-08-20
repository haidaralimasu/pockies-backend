const cors = require("cors");
const express = require("express");
const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
import { whitelistAddresses } from "./data/addresses";

const app = express();
app.use(cors());
const port = 8000;

let leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

app.get("/", (req, res) => {
  res.json("Hello World !");
});

app.get("/detail/:id", (req, res) => {
  const id = req.params.id;
  const address = leafNodes[id];

  const hexProof = merkleTree.getHexProof(address);
  res.json(hexProof);
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
