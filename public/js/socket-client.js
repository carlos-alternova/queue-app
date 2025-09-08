function connectToWebSockets(callback) {
  const socket = new WebSocket('ws://localhost:3000/ws')

  socket.onmessage = (event) => {
    const { type, payload } = JSON.parse(event.data)

    switch (type) {
      case 'onTicketCountChanged':
        callback(payload)
        break
      default:
        console.log('event data:', event.data)
        break
    }
  }

  socket.onclose = (event) => {
    console.log('Connection closed')
    setTimeout(() => {
      console.log('retrying to connect')
      connectToWebSockets()
    }, 1500)
  }

  socket.onopen = (event) => {
    console.log('Connected')
  }
}

export default connectToWebSockets
