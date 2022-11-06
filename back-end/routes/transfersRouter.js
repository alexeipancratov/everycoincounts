const express = require("express");
const ethers = require("ethers");
const contractAbi = require("../abis/abi.json");

function createTransfersRouter() {
  const transfersRouter = express.Router();

  transfersRouter.post("/", async (req, res) => {
    const provider = new ethers.providers.JsonRpcProvider();
    const signer = provider.getSigner();

    const contract = new ethers.Contract(process.env.CONTRACT_ADDRESS || "", contractAbi, provider);
    const contractWithSigner = contract.connect(signer);

    const tx = await contractWithSigner.transfer(
      req.body.institution,
      req.body.recipient,
      ethers.utils.parseEther(req.body.amount),
      req.body.message
    );

    res.send({
      transaction: tx,
    });
  });

  return transfersRouter;
}

module.exports = createTransfersRouter;
