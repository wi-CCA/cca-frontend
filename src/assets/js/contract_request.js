/* Factory */
async function create_contract(contract_, account_, inputToken_, outputTokens_, weights_) {
    //console.log("-- [request] create");
    let response = await contract_.connect(account_).create(
        inputToken_,
        outputTokens_,
        weights_,
        ethers.constants.AddressZero, // TODO
        Array(outputTokens_.length).fill(ethers.constants.AddressZero) // TODO
    );
    //console.log("-- [response] create :", response);
    return response;
}

async function wits_contract(contract_, account_, index_) {
    //console.log("-- [request] wits");
    let response = await contract_.connect(account_).wits(index_);
    //console.log("-- [response] wits :", response);
    return response;
}

/* Index Token */
async function weights_contract(contract_, account_, index_) {
    //console.log("-- [request] weights");
    let response = await contract_.connect(account_).weights(index_);
    //console.log("-- [response] weights :", response);
    return response;
}

async function inputToken_contract(contract_, account_) {
    //console.log("-- [request] inputToken");
    let response = await contract_.connect(account_).inputToken();
    //console.log("-- [response] inputToken :", response);
    return response;
}

async function outputTokens_contract(contract_, account_, index_) {
    //console.log("-- [request] outputTokens");
    let response = await contract_.connect(account_).outputTokens(index_);
    //console.log("-- [response] outputTokens :", response);
    return response;
}

async function enroll_contract(contract_, account_, to_, amount_, startBlock, endBlock, interval) {
    //console.log("-- [request] enroll");
    let response = await contract_.connect(account_).enroll(to_, amount_, startBlock, endBlock, interval);
    //console.log("-- [response] enroll :", response);
    return response;
}

export { create_contract, wits_contract, weights_contract, inputToken_contract, outputTokens_contract, enroll_contract };
