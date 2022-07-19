import axios from 'axios';
import {Buffer} from 'buffer';

const headers = {
'Content-Type': 'application/x-www-form-urlencoded',
Authorization:
  'Basic ' +
  Buffer.from(process.env.REACT_APP_CLIENT_ID + ':' + process.env.REACT_APP_CLIENT_SECRET).toString('base64'),
};
async function getTokenSpoty () {
    const token = await axios.post(
      'https://accounts.spotify.com/api/token',
      'grant_type=client_credentials',
      {'headers': headers}
    )
    return token
  }
  async function  getDataSpoty (count, token) {
    return axios(`https://api.spotify.com/v1/search?query=${encodeURIComponent(
        count
      )}&type=album,track,artist`,{
            'method': 'GET',
            'headers': {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': 'Bearer ' + token.data.access_token
            }
          })
        }
  async function loadMore (nextUrl, token){
    const res = axios(nextUrl,{
        'method': 'GET',
        'headers': {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'Authorization': 'Bearer ' + token.data?.access_token
        }
      })
      return res;
  };
export {getTokenSpoty, getDataSpoty, loadMore};
