const {readAccountsFromFile, writeAccountsToFile} = require("./utils/utils");
const {ethers} = require("ethers");
const {PROVIDER} = require("./utils/web3");
const userService = require('./services/userService')
const {sleepRandomSeconds} = require("./utils/timeUtil");
const {claimNFTXp} = require("./services/userService");

async function main() {
    const accounts = await readAccountsFromFile();
    const target = parseInt(process.argv[2], 10);
    const account = accounts[target];
    const wallet = new ethers.Wallet(account.privateKey, PROVIDER);
    // token不存在或者过期就先登录
    if (!account.expireOn || account.expireOn * 1000 < new Date()) {
        await userService.login(wallet, account)
        writeAccountsToFile(accounts)
        await sleepRandomSeconds()
    }
    await claimNFTXp(wallet, account)
    writeAccountsToFile(accounts)

}

main()