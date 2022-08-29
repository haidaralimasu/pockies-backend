const cors = require('cors')
const express = require('express')
const keccak256 = require('keccak256')
const { MerkleTree } = require('merkletreejs')
const { getAddresses } = require('./data/addresses.js')

const whitelistAddresses = getAddresses()

const app = express()
app.use(cors())
const port = 8000

let leafNodes = whitelistAddresses.map((addr) => keccak256(addr))
let merkleTree = new MerkleTree(leafNodes, keccak256, { sortPairs: true })

app.get('/proof/:useraddress', (req, res) => {
  const user = req.params.useraddress
  const useraddr = user.toLowerCase()
  const wl = whitelistAddresses.map((address) => address.toLowerCase())
  const id = wl.indexOf(useraddr)
  const addressOfUser = leafNodes[id]

  const hexProof = merkleTree.getHexProof(addressOfUser)
  res.json(hexProof)
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
