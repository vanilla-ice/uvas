import Vue from 'vue'
import Vuex from 'vuex'

import desk from './desk'
import transactions from './transactions'

Vue.use(Vuex)

const options = {
  modules: {
    desk,
    transactions,
  },
}

export default new Vuex.Store(options)
