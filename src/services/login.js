import fetch from '../common/js/fetch';
import apiUrl from './api-url.js';
//login=>登陆

export const loginCheck = () => fetch({
    'url': apiUrl.loginApi.loginCheck,
    'method': 'get',
});
