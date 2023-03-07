import FACTORY from '../json/WitFactory.json'
import CARD from '../json/WiccaIndexToken.json'
import TOKEN from '../json/TestERC20.json'
import address from '../json/address.json'

const FACTORY_ADDR = address.factory;
const CARD_ADDR_0 = address.wit0;
const CARD_ADDR_1 = address.wit1;
const CARD_ADDR_2 = address.wit2;

const TOKEN_ADDR_0 = address.Token0;
const TOKEN_ADDR_1 = address.Token1;
const TOKEN_ADDR_2 = address.Token2;
const TOKEN_ADDR_3 = address.Token3;
const TOKEN_ADDR_4 = address.Token4;
const TOKEN_ADDR_5 = address.Token5;


const FACTORY_ABI = FACTORY.abi;
const CARD_ABI = CARD.abi;
const TOKEN_ABI = TOKEN.abi;

export { FACTORY_ADDR, FACTORY_ABI, CARD_ADDR_0, CARD_ADDR_1, CARD_ADDR_2, CARD_ABI, TOKEN_ADDR_0, TOKEN_ADDR_1, TOKEN_ADDR_2, TOKEN_ADDR_3, TOKEN_ADDR_4, TOKEN_ADDR_5, TOKEN_ABI };