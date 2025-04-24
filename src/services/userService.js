const api = require("../apis/api")
const {callContract} = require("../utils/web3");
const {getNFTInfo} = require("../apis/api");

async function login(wallet, account) {
    const msg = "Welcome to Xtella.AI. This cryptographic signature helps us confirm that you own this address."
    const signature = wallet.signMessageSync(msg)
    const body = {
        address: account.address,
        signature,
        chainId: "0x38"
    }
    const res = await api.login(body, account.proxy)
    if (res) {
        account.token = res.token
        account.expireOn = res.expireOn
    }
}

async function claimNFTXp(wallet, account) {
    const {address,proxy} = account

    if (!account.tokenId) {
        const nftInfo = await getNFTInfo(address, proxy);
        account.tokenId = nftInfo.data[0].tokenId
    }

    const body = {
        chainId: "0x38",
        address: address,
        dataPlt: "nft",
        tokenId: account.tokenId
    };

    const claimInfo = await api.claimDNft(body, proxy)
    const hex = Buffer.from(claimInfo.purchaseId, 'utf8').toString('hex');
    const rawdata = "0xeea3ea3f00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000300000000000000000000000000000000000000000000000000000000000000800000000000000000000000000000000000000000000000000000000000000013" +
        hex +
        "00000000000000000000000000"
    const contractAddress = "0xfaF0DC4854b87507abF9A869fC2E838ACEEE2837"
    await callContract(wallet, contractAddress, "0", rawdata)
    console.log(`Address(${address}) claim ${claimInfo.claimPoints} XP successfully`)
}

module.exports = {
    login,
    claimNFTXp
}