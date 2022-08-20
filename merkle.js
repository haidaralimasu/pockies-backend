const keccak256 = require("keccak256");
const { MerkleTree } = require("merkletreejs");
const { whitelistAddresses } = require("./data/addresses.js");

let leafNodes = whitelistAddresses.map((addr) => keccak256(addr));
let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true });

const rootHash = merkleTree.getRoot();

console.log(merkleTree.toString());

const address = leafNodes[0];

const hexProof = merkleTree.getHexProof(address);

console.log(hexProof);
