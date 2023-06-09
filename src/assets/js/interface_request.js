import { FACTORY_ADDR, FACTORY_ABI, CARD_ADDR_0, CARD_ADDR_1, CARD_ADDR_2, CARD_ABI, TOKEN_ADDR_0, TOKEN_ADDR_1, TOKEN_ADDR_2, TOKEN_ADDR_3, TOKEN_ADDR_4, TOKEN_ADDR_5, TOKEN_ABI } from "./contract.js"
import { create_contract, wits_contract, weights_contract, inputToken_contract, outputTokens_contract, enroll_contract } from "./contract_request.js"

import { ethers } from "ethers";
const provider = new ethers.providers.Web3Provider(window.ethereum);

const targetChainId = '0x13881';
const targetRPCUrl = 'https://rpc.ankr.com/polygon_mumbai';
const targetBlockExploreUrl = 'https://polygonscan.com/';

let account = '';
let address = '';
let address_cards = [CARD_ADDR_0, CARD_ADDR_1, CARD_ADDR_2];
let address_tokens = [TOKEN_ADDR_0, TOKEN_ADDR_1, TOKEN_ADDR_2, TOKEN_ADDR_3, TOKEN_ADDR_4, TOKEN_ADDR_5];

let contract_factory = '';
let contract_tokens = [];
let contract_cards = {};

/* 
 * Initialize functions
 */
async function connectContract() {
    console.log("connect to contract!");
    contract_factory = new ethers.Contract(FACTORY_ADDR, FACTORY_ABI, provider);
    for (var i = 0; i < address_tokens.length; i++) {
        contract_tokens.push(new ethers.Contract(address_tokens[i], TOKEN_ABI, provider));
    }
    console.log("connect to contract done.");
}

async function connectMetamask() {
    // metamask installed
    if (provider) {
        const { chainId } = await provider.getNetwork()
        // console.log(chainId) // 42
        if (chainId != targetChainId) {
            window.ethereum.request({
                method: "wallet_switchEthereumChain",
                params: [{ chainId: targetChainId }]
            });
        }
        account = provider.getSigner();
        address = await provider.getSigner().getAddress();
        return true;
    } else {
        // If window.ethereum is not found then MetaMask is not installed
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
    return false;
}

function getAccount() {
    return address;
}

function getContract(contractName) {
    if (contractName === "FACTORY") return contract_factory;
}

function getTokenContract(index) {
    let id = parseInt(index);
    return contract_tokens[id];
}

function getAllTokenContract() {
    return contract_tokens;
}

function getTokenAddress(index) {
    let id = parseInt(index);
    return address_tokens[id];
}

function getAllTokenAddress() {
    return address_tokens;
}

function getTokenName(index) {
    if (index === "0" || index === 0) return "BTC";
    if (index === "1" || index === 1) return "ETH";
    if (index === "2" || index === 2) return "MATIC";
    if (index === "3" || index === 3) return "LINK";
    if (index === "4" || index === 4) return "WICCA";
    if (index === "5" || index === 5) return "USDC";
    return "";
}

function getTokenColor(index) {
    if (index === "0" || index === 0) return "green";
    if (index === "1" || index === 1) return "blue";
    if (index === "2" || index === 2) return "orange";
    if (index === "3" || index === 3) return "cyan";
    if (index === "4" || index === 4) return "purple";
    if (index === "5" || index === 5) return "red";
    return "";
}

/* 
 * Test Contract functions
 */

async function create(inputToken_, weights_) {
    let _contract = getContract("FACTORY");
    if (_contract === '' || address === '') return 0;
    let response = await create_contract(_contract, account, getTokenAddress(inputToken_), getAllTokenAddress(), weights_);
    return response;
}

async function getCardAddressList() {
    let result = [];
    let _contract = getContract("FACTORY");
    if (_contract === '' || address === '') return result;

    let i = 0;
    while (true) {
        try {
            result.push(await wits_contract(_contract, account, i++));
        }
        catch { console.log("catch cardAddressList!"); break; }
    }

    return result;
}

async function getInputTokenName(addr) {
    if (!(addr in contract_cards)) {
        contract_cards[addr] = new ethers.Contract(addr, CARD_ABI, provider);
    }
    let _contract = contract_cards[addr];
    if (_contract === '' || address === '') return result;

    let result = await inputToken_contract(_contract, account);
    const findIndex = address_tokens.indexOf(result);
    return getTokenName(findIndex);
}

async function getIndexTokenWeights(addr) {
    if (!(addr in contract_cards)) {
        contract_cards[addr] = new ethers.Contract(addr, CARD_ABI, provider);
    }
    let _contract = contract_cards[addr];
    if (_contract === '' || address === '') return result;

    let tokenAddressList = [];

    let idx = 0;
    while (true) {
        try {
            tokenAddressList.push(await outputTokens_contract(_contract, account, idx++));
        }
        catch { console.log("catch getIndexTokenWeights!"); break; }
    }

    let result = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < tokenAddressList.length; i++) {
        const findIndex = address_tokens.indexOf(tokenAddressList[i]);
        result[findIndex] = (await weights_contract(_contract, account, i));
    }

    return result;
}

async function enroll(addr) {
    if (!(addr in contract_cards)) {
        contract_cards[addr] = new ethers.Contract(addr, CARD_ABI, provider);
    }
    let _contract = contract_cards[addr];
    if (_contract === '' || address === '') return result;

    // TODO; dummy values
    let amount_ = 0;
    let startBlock = 0;
    let endBlock = 0;
    let interval = 0;

    let response = await enroll_contract(_contract, account, address, amount_, startBlock, endBlock, interval);
    return response;
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
}
export { connectContract, connectMetamask, getAccount, getContract, getTokenName, getTokenColor, create, getCardAddressList, getInputTokenName, getIndexTokenWeights, enroll, getMonthName };