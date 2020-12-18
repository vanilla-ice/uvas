export const CARD_DEFAULT_CONFIG = {
  width: 300,
  height: 100,
  title: 'Card',
  x: 0,
  y: 0,
  index: 0,
}

export const STEP_SIZE = 10

class Card {
  constructor(
    width = CARD_DEFAULT_CONFIG.width,
    height = CARD_DEFAULT_CONFIG.height,
    title = CARD_DEFAULT_CONFIG.title,
    x = CARD_DEFAULT_CONFIG.x,
    y = CARD_DEFAULT_CONFIG.y,
    index = CARD_DEFAULT_CONFIG.index,
  ) {
    // id generate https://tech.geekjob.ru/prostoy-sposob-generacii-id-uuid/
    this.id = (~~(Math.random() * 1e8)).toString(16)
    this.width = width
    this.height = height
    this.title = title + ' ' + this.id
    this.x = x
    this.y = y
    this.index = index
  }
}

const initNewDesk = () => {
  const newDesk = Array.from(Array(5)).map((_, index) => ({
    ...new Card(),
    // card index * (height card + margin)
    y: index * (CARD_DEFAULT_CONFIG.height + 20),
    index: ++index,
  }))

  localStorage.setItem('cards', JSON.stringify(newDesk))

  return newDesk
}

const getInitialCards = () => {
  const savedCards = JSON.parse(localStorage.getItem('cards'))

  if (savedCards) return savedCards
  else return initNewDesk()
}

const state = {
  cards: getInitialCards(),
  deletedItem: null,
}

const getters = {
  cards: state => state.cards,
  deletedItem: state => state.deletedItem,
  isUndoAvailable: state => Boolean(state.deletedItem),
  isCreateAvailable: state => state.cards.length < 5,
}

const actions = {
  createCard({ getters, dispatch, commit }, { centerX, centerY }) {
    const cards = [
      ...getters.cards,
      new Card(
        CARD_DEFAULT_CONFIG.width,
        CARD_DEFAULT_CONFIG.height,
        'Card',
        centerX,
        centerY,
        getters.cards.length + 1,
      ),
    ]
    dispatch('updateDeck', cards)
    dispatch('saveDeck')
    commit('setDeletedItem', null)
  },

  deleteCard({ getters, dispatch, commit }, id) {
    commit(
      'setDeletedItem',
      getters.cards.find(c => c.id === id),
    )
    dispatch(
      'updateDeck',
      getters.cards.filter(c => c.id !== id),
    )
    dispatch('saveDeck')
  },

  undoDelete({ getters, dispatch, commit }) {
    dispatch('updateDeck', [...getters.cards, getters.deletedItem])
    commit('setDeletedItem', null)
    dispatch('saveDeck')
  },

  updateCardPosition({ getters, dispatch }, { x, y, id }) {
    const cards = getters.cards.map(item => {
      if (item.id === id)
        return {
          ...item,
          x,
          y,
        }
      else return item
    })
    dispatch('updateDeck', cards)
  },

  updateCardSize({ getters, dispatch }, { width, height, id }) {
    const cards = getters.cards.map(item => {
      if (item.id === id)
        return {
          ...item,
          width,
          height,
        }
      else return item
    })
    dispatch('updateDeck', cards)
  },

  updateCardOrder({ getters, dispatch }, id) {
    const sortedCards = getters.cards.sort((a, b) => a.index - b.index)
    const length = sortedCards.length - 1
    const currentIndex = sortedCards.findIndex(card => card.id === id)
    const maxIndex = sortedCards[length].index

    if (currentIndex === length) return

    const cards = sortedCards.map(card => {
      if (card.id === id)
        return {
          ...card,
          index: maxIndex,
        }
      else if (currentIndex < card.index)
        return {
          ...card,
          index: card.index - 1,
        }
      return card
    })

    dispatch('updateDeck', cards)
    dispatch('saveDeck')
  },

  updateDeck({ commit }, cards) {
    commit('setCards', cards)
  },

  saveDeck({ getters }) {
    localStorage.setItem('cards', JSON.stringify(getters.cards))
  },
}

const mutations = {
  setCards: (state, cards) => (state.cards = cards),
  setDeletedItem: (state, card) => (state.deletedItem = card),
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations,
}
