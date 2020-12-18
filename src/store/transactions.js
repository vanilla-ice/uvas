import { SocketService } from '@/utils/socketService'

import { formatTransaction } from '@/utils/helpers'

const state = {
  transactions: [],
  isLoading: false,
  socketInstance: null,
  transactionsAmount: 0,
}

const getters = {
  transactions: state => state.transactions,
  socketInstance: state => state.socketInstance,
  transactionsAmount: state => state.transactionsAmount,
}

const actions = {
  initSocket({ commit, getters }) {
    if (!getters.socketInstance) commit('setSocketInstance', new SocketService())
  },

  subscribeTransactions({ getters }) {
    getters.socketInstance.subscribe()
  },

  unsubscribeTransactions({ getters }) {
    getters.socketInstance.unsubscribe()
  },

  receiveTransaction({ getters, commit }, transaction) {
    const formattedTransaction = formatTransaction(transaction)
    commit('setTransactions', [...getters.transactions, formattedTransaction])
    commit('calculateAmount', formattedTransaction.amount)
  },

  clear({ commit }) {
    commit('setTransactions', [])
  },
}

const mutations = {
  setTransactions: (state, transactions) => (state.transactions = transactions),
  setSocketInstance: (state, instance) => (state.socketInstance = instance),
  calculateAmount: (state, amount) => (state.transactionsAmount += amount),
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
