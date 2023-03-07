/* Factory */
async function create_contract(contract_, account_, inputToken_, outputTokens_, weights_) {
    console.log("-- [request] create");
    let response = await contract_.methods.create(inputToken_, outputTokens_, weights_).send({ from: account_ });
    console.log("-- [response] create :", response);
    return response;
}

/* Call */
/*
async function allowance_contract(_contract, _account, _address) {
    console.log("-- [request] allowance");
    let response = await _contract.methods.allowance(_account, _address).call();
    console.log("-- [response] allowance :", response);
    return response;
}
*/
export { create_contract };