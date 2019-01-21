import fetch from '../common/js/fetch';
import apiUrl from './api-url.js';

export const getBaList = (params) => fetch({
    'url': apiUrl.myRank.baList,
    'method': 'get',
    'params': params
});