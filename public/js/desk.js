import connectToWebSockets from './socket-client.js'

// HTML references:
const deskTitle = document.querySelector('h1')
const pendingText = document.getElementById('lbl-pending')

const getPendingTickets = async () => {
  const pendingTickets = await fetch('/api/ticket/pending').then((resp) =>
    resp.json()
  )

  pendingText.innerText = `Pending: ${pendingTickets.length || 0}`
}

const getDeskName = () => {
  // My method:
  // const url = document.baseURI
  // const params = url.split('?').pop()
  // const paramsArray = params.split('&').map((pair) => pair.split('='))
  // const paramsMap = new Map(paramsArray)
  // const deskName = paramsMap.get('deskName')

  const params = window.location.search
  const extractedParams = new URLSearchParams(params)

  if (!extractedParams.has('deskName')) {
    window.location = 'index.html'
    throw new Error('deskName param is required')
  }

  deskTitle.innerText = extractedParams.get('deskName')
}

getPendingTickets()
getDeskName()
connectToWebSockets(pendingText)
