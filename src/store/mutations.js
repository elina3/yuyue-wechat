import * as types from './mutation-types'

const mutations = {
  [types.RECORD_WXINFO](state, wxInfo) {
    state.wxInfo = wxInfo;
  },
  [types.SET_BOTTOMTABHEIGHT](state, height) {
    state.bottomTabHeight = height;
  },
  [types.SET_CURRENTINDEX](state, index) {
    state.index = index;
  },
  [types.HIDDEN_FOOT](state, type) {
    state.footIsShow = type;
  }
};

export default mutations;