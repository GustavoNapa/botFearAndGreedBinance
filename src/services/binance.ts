import axios from 'axios';
 
async function time() {
  return await axios.get(`http://192.168.1.7:8001/binance/time`);
}

async function exchangeInfo(symbol:any = null) {
  //return publicCall('/v3/exchangeInfo', "", "GET");
  var result = null;
  if(!symbol) result = await axios.get(`http://192.168.1.7:8001/binance/info`);
  else result = await axios.get(`http://192.168.1.7:8001/binance/info/${symbol}`)

  return await result.data;
}
 
async function depth(symbol = 'BTCBRL', limit = 5) {
  //return publicCall('/v3/depth', { symbol, limit });
}

async function accountInformations() {
  //return privateCall('/v3/account', "");
  return await axios.get(`http://192.168.1.7:8001/binance/accountInfo`);
}

async function accountBalances() {
  //return privateCall('/v3/account', "");
  return await axios.get(`http://192.168.1.7:8001/binance/accountBalances`);
}

async function newOrder(symbol:any, quantity:any, price:any, side = 'BUY', type = 'MARKET') {
  //price = parseInt(price);
  //if(price === 0 ) price = null;

  //const data = { symbol, side, type, quoteOrderQty: quantity };  
  
  //console.log(await privateCall('/v3/order', data, 'POST'));
 
  //return privateCall('/v3/order', data, 'POST');
}
 
export {time, depth, accountInformations, newOrder, exchangeInfo}