const axios = require('axios');
const {SocksProxyAgent} = require("socks-proxy-agent");

let headers = {
    'accept': 'application/json, text/plain, */*',
    'accept-language': 'zh-CN,zh;q=0.9,en-US;q=0.8,en;q=0.7',
    'connection': 'keep-alive', // Axios usually handles this automatically
    'content-type': 'application/json',
    'origin': 'https://xtella.ai',
    'sec-ch-ua': '"Google Chrome";v="135", "Not-A.Brand";v="8", "Chromium";v="135"',
    'sec-ch-ua-mobile': '?0',
    'sec-ch-ua-platform': '"macOS"',
    'sec-fetch-dest': 'empty',
    'sec-fetch-mode': 'cors',
    'sec-fetch-site': 'same-origin',
    'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36',
    'x-custom-header': 'foobar', // Include the custom header
}

async function login(body, proxy) {
    let httpsAgent
    if (proxy != null && proxy !== "") {
        httpsAgent = new SocksProxyAgent(`${proxy}`)
    }

    try {
        const response = await axios.post(
            'https://xtella.ai/api/v1/bid/bidLogin',
            body,
            {
                headers,
                httpsAgent
            })
        if (response.data.code === 200) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.error('login failed:', error.response?.data || error.message);
    }
}

async function getNFTInfo(address, proxy) {
    let httpsAgent
    if (proxy != null && proxy !== "") {
        httpsAgent = new SocksProxyAgent(`${proxy}`)
    }

    try {
        const response = await axios.get(
            `https://xtella.ai/api/v1/bid/getMyPremintAndMintDNftPage?chainId=0x38&address=${address}&pageNum=1&pageSize=20`,
            {
                headers,
                httpsAgent
            })
        if (response.data.code === 200) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.error('get nft detail failed:', error.response?.data || error.message);
    }
}

async function claimDNft(body, proxy) {
    let httpsAgent
    if (proxy != null && proxy !== "") {
        httpsAgent = new SocksProxyAgent(`${proxy}`)
    }

    try {
        const response = await axios.post(
            'https://xtella.ai/api/v1/bid/purchaseAndClaimDNft',
            body,
            {
                headers,
                httpsAgent
            })
        if (response.data.code === 200) {
            return response.data.data
        }
        return null
    } catch (error) {
        console.error('claim failed:', error.response?.data || error.message);
    }
}

module.exports = {
    login,
    getNFTInfo,
    claimDNft
}
