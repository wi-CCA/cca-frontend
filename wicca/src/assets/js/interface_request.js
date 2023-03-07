/*
 * Declarations
 */
import detectEthereumProvider from '@metamask/detect-provider';
import { ethers } from "ethers";
import { FACTORY_ADDR, FACTORY_ABI, CARD_ADDR_0, CARD_ADDR_1, CARD_ADDR_2, CARD_ABI, TOKEN_ADDR_0, TOKEN_ADDR_1, TOKEN_ADDR_2, TOKEN_ADDR_3, TOKEN_ADDR_4, TOKEN_ADDR_5, TOKEN_ABI } from "./contract.js"
import { create_contract, wits_contract, weights_contract, inputToken_contract, outputTokens_contract, enroll_contract } from "./contract_request.js"
const testChainId = '0x13881';
const RPCUrl = 'https://matic-mumbai.chainstacklabs.com';
const blockExploreUrl = 'https://mumbai.polygonscan.com';
const localhostRPCUrl = 'http://localhost:8545';
const localhostChainId = '0x1D79'; // 7545

let account = '';
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
    window.web3 = new Web3(window.ethereum);
    contract_factory = await new window.web3.eth.Contract(FACTORY_ABI, FACTORY_ADDR);
    for (var i = 0; i < address_tokens.length; i++) { contract_tokens.push(await new window.web3.eth.Contract(TOKEN_ABI, address_tokens[i])); }
    console.log("connect to contract done.");
}

async function connectMetamask() {
    // metamask installed
    // const provider = window.ethereum;
    const provider = await detectEthereumProvider();
    if (provider) {
        // const chainId = await provider.request({ method: 'eth_chainId' });
        try {
            await provider.request({
                method: 'wallet_switchEthereumChain',
                params: [{ chainId: localhostChainId }],
            });
            console.log("You have succefully switched to Binance Test network");

            // set global variables (contract, account)
            const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
            account = accounts[0];
            return true;
        } catch (switchError) {
            console.log("Failed to switch to the network");

            // This error code indicates that the chain has not been added to MetaMask.
            if (switchError.code === 4902) {
                try {
                    console.log("This network is not available in your metamask, please add it");

                    await provider.request({
                        method: 'wallet_addEthereumChain',
                        params: [
                            {
                                chainId: localhostChainId,
                                chainName: 'Mumbai',
                                rpcUrls: [localhostRPCUrl],
                                blockExplorerUrls: [blockExploreUrl],
                                nativeCurrency: {
                                    symbol: 'MATIC',
                                    decimals: 18
                                }
                            }
                        ]
                    });

                    // connect
                    await provider.request({
                        method: 'wallet_switchEthereumChain',
                        params: [{ chainId: localhostChainId }],
                    });
                    console.log("You have succefully switched to Binance Test network");

                    // set global variables (contract, account)
                    const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
                    account = accounts[0];

                    return true;
                } catch (addError) {
                    console.log(addError);
                }
            }
        }
    } else {
        // If window.ethereum is not found then MetaMask is not installed
        alert('MetaMask is not installed. Please install it to use this app: https://metamask.io/download.html');
    }
    return false;
}

function getAccount() {
    return account;
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
    if (index === "2" || index === 2) return "FTM";
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
async function addTokenToMetamask(tokenName) {
    const tokenContract = getContract(tokenName);
    const symbol = await tokenContract.methods.symbol().call();
    const decimals = await tokenContract.methods.decimals().call();
    const tokenImage = getContractImg(tokenName);

    const provider = window.ethereum;
    if (provider) {
        try {
            // wasAdded is a boolean. Like any RPC method, an error may be thrown.
            const wasAdded = await provider.request({
                method: 'wallet_watchAsset',
                params: {
                    type: 'ERC20',
                    options: {
                        address: tokenContract._address,
                        symbol: symbol,
                        decimals: decimals,
                        image: tokenImage,
                    },
                },
            });
            if (wasAdded) {
                console.log('Thanks for your interest!');
            } else {
                console.log('Your loss!');
            }
        } catch (error) {
            console.log(error);
        }
    }
}

function getContractImg(contractName) {
    if (contractName === "WMATIC") return 'https://github.com/D3LAB-DAO/FOX-frontend/blob/polygon/frontend/src/img/polygon-icon.png?raw=true';
    else if (contractName === "FOXS") return 'https://github.com/FOX-Finance/FOX-frontend/blob/main/frontend/src/img/foxs-icon.png?raw=true';
    else if (contractName === "FOX") return 'https://github.com/FOX-Finance/FOX-frontend/blob/main/frontend/src/img/fox-icon.png?raw=true';
}

function getApproveAddress(contractName) {
    if (contractName === "WMATIC") return FOXFARM_CONTRACT_ADDR;
    else if (contractName === "FOXS") return FOXFARM_CONTRACT_ADDR;
    else if (contractName === "FOX") return FOXFARM_CONTRACT_ADDR;
}
*/

/* 
 * Test Contract functions
 */

async function create(inputToken_, weights_) {
    let _contract = getContract("FACTORY");
    if (_contract === '' || getAccount() === '') return 0;
    let response = await create_contract(_contract, getAccount(), getTokenAddress(inputToken_), getAllTokenAddress(), weights_);
    return response;
}

async function getCardAdressList() {
    let result = [];
    let _contract = getContract("FACTORY");
    if (_contract === '' || getAccount() === '') return result;

    let i = 0;
    while (true) {
        try {
            result.push(await wits_contract(_contract, getAccount(), i++));
        }
        catch { console.log("catch cardAddressList!"); break; }
    }
    return result;
}

async function getInputTokenName(addr) {
    if (!(addr in contract_cards)) {
        contract_cards[addr] = await new window.web3.eth.Contract(CARD_ABI, addr);
    }
    let _contract = contract_cards[addr];
    if (_contract === '' || getAccount() === '') return result;

    let result = await inputToken_contract(_contract, getAccount());
    const findIndex = address_tokens.indexOf(result);
    return getTokenName(findIndex);
}

async function getIndexTokenWeights(addr) {
    if (!(addr in contract_cards)) {
        contract_cards[addr] = await new window.web3.eth.Contract(CARD_ABI, addr);
    }
    let _contract = contract_cards[addr];
    if (_contract === '' || getAccount() === '') return result;

    let tokenAddressList = [];

    let idx = 0;
    while (true) {
        try {
            tokenAddressList.push(await outputTokens_contract(_contract, getAccount(), idx++));
        }
        catch { console.log("catch getIndexTokenWeights!"); break; }
    }

    let result = [0, 0, 0, 0, 0, 0];
    for (var i = 0; i < tokenAddressList.length; i++) {
        const findIndex = address_tokens.indexOf(tokenAddressList[i]);
        result[findIndex] = (await weights_contract(_contract, getAccount(), i));
    }

    return result;
}

async function enroll(addr) {
    if (!(addr in contract_cards)) {
        contract_cards[addr] = await new window.web3.eth.Contract(CARD_ABI, addr);
    }
    let _contract = contract_cards[addr];
    if (_contract === '' || getAccount() === '') return result;

    // TODO; dummy values
    let amount_ = 0;
    let startBlock = 0;
    let endBlock = 0;
    let interval = 0;

    let response = await enroll_contract(_contract, getAccount(), getAccount(), amount_, startBlock, endBlock, interval);
    return response;
}

function getMonthName(monthNumber) {
    const date = new Date();
    date.setMonth(monthNumber - 1);
    return date.toLocaleString('en-US', { month: 'long' });
}
export { connectContract, connectMetamask, getAccount, getContract, getTokenName, getTokenColor, create, getCardAdressList, getInputTokenName, getIndexTokenWeights, enroll, getMonthName };