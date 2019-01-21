import fetch from '../common/js/fetch';
import apiUrl from './api-url.js';

export const getSellerList = (params) => fetch({
    'url': apiUrl.sellerRank.sellerList,
    'method': 'get',
    'params': params
});