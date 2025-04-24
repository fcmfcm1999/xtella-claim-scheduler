require('dotenv').config();
const {readFileSync, writeFileSync} = require("node:fs");
const path = require('path');

const ADDRESSES_FILE_PATH = path.join(__dirname, '../data/addresses.json');

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

function readAccountsFromFile() {
    const data = readFileSync(ADDRESSES_FILE_PATH, 'utf-8');
    return JSON.parse(data)
}

function writeAccountsToFile(accounts) {
    writeFileSync(ADDRESSES_FILE_PATH, JSON.stringify(accounts, null, 2));
}

module.exports = {
    shuffleArray,
    readAccountsFromFile,
    writeAccountsToFile
}
