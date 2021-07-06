//https://api.alternative.me/fng/?limit=10

import axios from 'axios';

/**
 * alternativeAPI
 */
async function alternativeAPI(limit = 10, format = 'json',date_format = 'br') {
  var result:any;

  result = await axios.get(`https://api.alternative.me/fng/?limit${limit}&format=${format}&date_format=${date_format}`);

  return await result.data;
}

export default alternativeAPI;
