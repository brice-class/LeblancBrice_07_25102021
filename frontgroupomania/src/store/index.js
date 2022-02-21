import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    navBox: true
  },
  mutations: {
    changeNavBox(state,navBox){
      console.log(navBox);
      state.navBox = navBox;
    }
  },
  actions: {
    changeNavBox({commit}){
      // this.navBox=false;
      commit('changeNavBox',false)
    }
  },
  modules: {
  }
})
