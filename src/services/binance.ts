import axios from 'axios';
import {stringify} from 'querystring';
import {createHmac} from "crypto";
 
async function publicCall(path:any, data:any, method = 'GET', headers = {}) {
    try {
        const qs = data ? `?${await stringify(data)}` : '';

        var result:any;

        if(method == 'GET'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.get(`${process.env.API_URL}${path}${qs}`, {headers: {"X-MBX-APIKEY": process.env.API_KEY}});
        }
        if(method == 'POST'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.post(`${process.env.API_URL}${path}${qs}`, data, headers);
        }
        if(method == 'PUT'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.put(`${process.env.API_URL}${path}${qs}`, data, headers);
        }
        if(method == 'DELETE'){
          console.log("Executando chamada "+method+" na Binance");
          result = await axios.delete(`${process.env.API_URL}${path}${qs}`, data);
        }
        return result.data;
    } catch (err) {
        console.error(err);
    }
}

async function privateCall(path:any, data = {}, method = 'GET') {
  if (!process.env.API_KEY || !process.env.SECRET_KEY)
      throw new Error('Preencha corretamente sua API KEY e SECRET KEY');

  var apiURL:any = '';
  var apiKey:any = '';
  var apiSecret:any = '';
  if(process.env.TEST !== 'true'){
    apiURL = process.env.API_URL;
    apiKey = process.env.API_KEY;
    apiSecret = process.env.SECRET_KEY;
  }else{
    apiURL = process.env.API_URL_TEST;
    apiKey = process.env.API_KEY_TEST;
    apiSecret = process.env.SECRET_KEY_TEST;
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