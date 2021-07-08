import axios from 'axios';
import {stringify} from 'querystring';
import {createHmac} from "crypto";

const API_URL="https://api.binance.com/api"
const API_URL_TEST="https://testnet.binance.vision/api"

const API_KEY="gFDCN40JdxtiWjN5YGPNc5tLo3ljMABxfo54Ii2jYjxWyfOlZr9dDYDemD87dLBd"
const API_KEY_TEST="h8p1cv04WtC9WD9oFWEXz0bbl6lTufwHGPZj2bDELaeDycK4zB9mq0PVKJkC7jRU"

const SECRET_KEY="XYUNYDERPCi20X5z3lr9uDXYfgJfocdvKAF0351cASLr3G7tlWekT4DkZURtJ11S"
const SECRET_KEY_TEST="U1POEqvRBFEx8YEyvJkEpT0TltvGKitNJrNg1BLmDC3DEbBSYqVlERG7oNPkXbYT"

const TEST:Boolean=false
 
async function publicCall(path:any, data:any, method = 'GET', headers = {}) {
    try {
        const qs = data ? `?${await stringify(data)}` : '';

        var result:any;

        if(method == 'GET'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.get(`${API_URL}${path}${qs}`, {headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            'X-Requested-With': 'XMLHttpRequest'
          }});
        }
        if(method == 'POST'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.post(`${API_URL}${path}${qs}`, data, headers);
        }
        if(method == 'PUT'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.put(`${API_URL}${path}${qs}`, data, headers);
        }
        if(method == 'DELETE'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.delete(`${API_URL}${path}${qs}`, data);
        }
        return result.data;
    } catch (err) {
        console.error(err);
    }
}

async function privateCall(path:any, data = {}, method = 'GET') {
  if (!API_KEY || !SECRET_KEY)
      throw new Error('Preencha corretamente sua API KEY e SECRET KEY');

  var apiURL:any = '';
  var apiKey:any = '';
  var apiSecret:any = '';
  if(TEST !== true){
    apiURL = API_URL;
    apiKey = API_KEY;
    apiSecret = SECRET_KEY;
  }else{
    apiURL = API_URL_TEST;
    apiKey = API_KEY_TEST;
    apiSecret = SECRET_KEY_TEST;
  }
  

  const timestamp = Date.now();
  
  const signature = createHmac('sha256', apiSecret)
      .update(`${stringify({ ...data, timestamp })}`)
      .digest('hex');

  const newData = { ...data, timestamp, signature };
  const qs = `?${stringify(newData)}`;

  var result:any;

  try {
      if(method == 'GET'){
        console.log("Executando chamada privada / "+method+" na Binance");
        result = await axios.get(`${apiURL}${path}${qs}`, {headers: {"X-MBX-APIKEY": apiKey}});
      }
      if(method == 'POST'){
        console.log("Executando chamada privada / "+method+" na Binance");
        result = await axios.post(`${apiURL}${path}${qs}`, ``, {headers: {"X-MBX-APIKEY": apiKey}});
      }
      if(method == 'PUT'){
        console.log("Executando chamada privada / "+method+" na Binance");
        result = await axios.put(`${apiURL}${path}${qs}`, {headers: {"X-MBX-APIKEY": apiKey}});
      }
      if(method == 'DELETE'){
        console.log("Executando chamada privada / "+method+" na Binance");
        result = await axios.delete(`${apiURL}${path}${qs}`, data);
      }
      return result.data;
  } catch (err) {
    return err;
  }
}
 
async function time() {
  return publicCall('/v3/time', "", "GET");
}

async function exchangeInfo() {
  return publicCall('/v3/exchangeInfo', "", "GET");
}
 
async function depth(symbol = 'BTCBRL', limit = 5) {
  return publicCall('/v3/depth', { symbol, limit });
}

async function accountInformations() {
  return privateCall('/v3/account', "");
}

async function newOrder(symbol:any, quantity:any, price:any, side = 'BUY', type = 'MARKET') {
  price = parseInt(price);
  if(price === 0 ) price = null;

  const data = { symbol, side, type, quoteOrderQty: quantity };  
  
  console.log(await privateCall('/v3/order', data, 'POST'));
 
  //return privateCall('/v3/order', data, 'POST');
}
 
export {time, depth, accountInformations, newOrder, exchangeInfo}