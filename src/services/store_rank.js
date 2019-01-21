import fetch from '../common/js/fetch';
import apiUrl from './api-url.js';

export const getStoreList = (params) => fetch({
    'url': apiUrl.storeRank.storeList,
    'method': 'get',
    'params': params
});

export const getStoreCount = (params) => fetch({
  'url': apiUrl.storeRank.storeCount,
  'method': 'get',
  'params': params
});