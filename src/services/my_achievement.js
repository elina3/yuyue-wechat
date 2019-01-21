import fetch from '../common/js/fetch';
import apiUrl from './api-url.js';

export const getAchievementData = (params) => fetch({
    'url': apiUrl.myAchievement.achievementData,
    'method': 'get',
    'params': params
});

export const getAchievementChart = (params) => fetch({
    'url': apiUrl.myAchievement.achievementChart,
    'method': 'get',
    'params': params
});

