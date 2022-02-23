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
    },
    disconnectChange(state,navBox){
      console.log(navBox);
      state.navBox = navBox;
    },
  },
  actions: {
    changeNavBox({commit}){ 
      commit('changeNavBox',false)
    },
    disconnectChange({commit}){
      commit('disconnectChange',true)
    }

  },
  modules: {
  }
})
