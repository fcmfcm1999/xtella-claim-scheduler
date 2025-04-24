const {ethers} = require("ethers");

const rpcUrl = "https://bsc-rpc.publicnode.com";

const PROVIDER = new ethers.JsonRpcProvider(rpcUrl);

async function callContract(wallet, contractAddress, value, input_data) {
    const tx = await wallet.sendTransaction({
        to: contractAddress,
        value: ethers.parseEther(value),
        data: input_data,
    })

    console.log("tx has been sent: ", tx.hash)
    const receipt = await tx.wait()
    console.log("tx confirmed successfully: ", receipt.hash)
    return receipt
}

module.exports = {
    PROVIDER,
    callContract
}