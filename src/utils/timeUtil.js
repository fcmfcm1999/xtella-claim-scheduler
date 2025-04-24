function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

function sleepRandomSeconds() {
    let ms = Math.floor(Math.random() * 50000) + 30000
    return new Promise(resolve => setTimeout(resolve, ms))
}

module.exports = {
    sleep,
    sleepRandomSeconds
}