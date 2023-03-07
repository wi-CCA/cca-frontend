/* Factory */
async function create_contract(contract_, account_, inputToken_, outputTokens_, weights_) {
    //console.log("-- [request] create");
    let response = await contract_.methods.create(inputToken_, outputTokens_, weights_).send({ from: account_ });
    //console.log("-- [response] create :", response);
    return response;
}

async function wits_contract(contract_, account_, index_) {
    //console.log("-- [request] wits");
    let response = await contract_.methods.wits(index_).call({ from: account_ });
    //console.log("-- [response] wits :", response);
    return response;
}

/* Index Token */
async function weights_contract(contract_, account_, index_) {
    //console.log("-- [request] weights");
    let response = await contract_.methods.weights(index_).call({ from: account_ });
    //console.log("-- [response] weights :", response);
    return response;
}

async function inputToken_contract(contract_, account_) {
    //console.log("-- [request] inputToken");
    let response = await contract_.methods.inputToken().call({ from: account_ });
    //console.log("-- [response] inputToken :", response);
    return response;
}

async function outputTokens_contract(contract_, account_, index_) {
    //console.log("-- [request] outputTokens");
    let response = await contract_.methods.outputTokens(index_).call({ from: account_ });
    //console.log("-- [response] outputTokens :", response);
    return response;
}

async function enroll_contract(contract_, account_, to_, amount_, startBlock, endBlock, interval) {
    //console.log("-- [request] enroll");
    let response = await contract_.methods.enroll(to_, amount_, startBlock, endBlock, interval).send({ from: account_ });
    //console.log("-- [response] enroll :", response);
    return response;
}

export { create_contract, wits_contract, weights_contract, inputToken_contract, outputTokens_contract, enroll_contract };