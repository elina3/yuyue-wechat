import fetch from '../common/js/fetch';
import apiUrl from './api-url.js';

// 顾问列表
export const getAdviserLists = (params) => fetch({
  'url': apiUrl.dashBoard.getBaList,
  'method': 'get',
  'params': params
});

// 数据看板
export const getDashboard = (params) => fetch({
  'url': apiUrl.dashBoard.getDashBoard,
  'method': 'get',
  'params': params
});

// 数据看板-图表
export const getChartDashboard = (params) => fetch({
  'url': apiUrl.dashBoard.getChart,
  'method': 'get',
  'params': params
});