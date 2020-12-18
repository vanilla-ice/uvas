import store from '@/store'

const SOCKET_URL = 'wss://ws.blockchain.info/inv'

const SOCKET_SUBSCRIBE_EVENT = 'unconfirmed_sub'
const SOCKET_UNSUBSCRIBE_EVENT = 'unconfirmed_unsub'

export class SocketService {
  constructor() {
    try {
      this.setup()
    } catch (e) {
      console.error(e)
    }
  }

  setup() {
    const socket = new WebSocket(SOCKET_URL)

    socket.onopen = () => console.log('socket successfully opened')

    socket.onmessage = ev => store.dispatch('transactions/receiveTransaction', JSON.parse(ev.data))

    this.socket = socket
  }

  subscribe() {
    if (!this.socket) return console.warn('no socket inited')
    this.socket.send(JSON.stringify({ op: SOCKET_SUBSCRIBE_EVENT }))
  }

  unsubscribe() {
    if (!this.socket) return console.warn('no socket inited')
    this.socket.send(JSON.stringify({ op: SOCKET_UNSUBSCRIBE_EVENT }))
  }
}
