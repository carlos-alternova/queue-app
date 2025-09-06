import connectToWebSockets from './socket-client.js'

// HTML references:
const pendingText = document.getElementById('lbl-pending')

const getPendingTickets = async () => {
  const pendingTickets = await fetch('/api/ticket/pending').then((resp) =>
    resp.json()
  )

  pendingText.innerText = `Pending: ${pendingTickets.length || 0}`
}

getPendingTickets()
connectToWebSockets(pendingText)
