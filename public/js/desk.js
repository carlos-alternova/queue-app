import connectToWebSockets from './socket-client.js'

// HTML references:
const deskTitle = document.querySelector('h1')
const pendingText = document.getElementById('lbl-pending')
const ticketsContainer = document.getElementById('tickets_container')
const activeTicketText = document.querySelector('small')
const attendButton = document.getElementById('draw_btn')
const finishButton = document.getElementById('finish_btn')

// active ticket:
let activeTicket

const getPendingTickets = async () => {
  const pendingTickets = await fetch('/api/ticket/pending').then((resp) =>
    resp.json()
  )

  const allTickets = await fetch('/api/ticket').then((resp) => resp.json())

  const deskName = getDeskName()
  const activeDeskTicket = allTickets.tickets.find(
    (ticket) => ticket.handleAtDesk === deskName && !ticket.done
  )
  activeTicket = activeDeskTicket

  const attendingText = activeDeskTicket ? activeDeskTicket.number : 'Nobody'
  activeTicketText.innerText = attendingText

  if (pendingTickets.length > 0) ticketsContainer.classList.add('d-none')

  pendingText.innerText = `${pendingTickets.length || 0}`
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

  return extractedParams.get('deskName')
}

const setDeskName = () => {
  const deskName = getDeskName()
  deskTitle.innerText = deskName
}

const onWebSocketMessageCB = (type, payload) => {
  switch (type) {
    case 'onTicketCountChanged':
      payload === 0
        ? ticketsContainer.classList.remove('d-none')
        : ticketsContainer.classList.add('d-none')
      pendingText.innerText = payload
      break
    case 'onTicketDrawn':
      activeTicketText.innerText = payload
      break
    default:
      console.log('event data:', event.data)
      break
  }
}

const onAssignButtonClick = async () => {
  const deskName = getDeskName()

  const { ticket } = await fetch(`/api/ticket/draw/${deskName}`).then((resp) =>
    resp.json()
  )
  if (ticket) activeTicket = ticket
}

const onFinishButtonClick = async () => {
  if (!activeTicket) throw new Error('No active ticket yet')

  await fetch(`/api/ticket/done/${activeTicket.id}`, { method: 'PUT' })

  activeTicketText.innerText = 'Nobody'
}

// Listeners:
attendButton.addEventListener('click', onAssignButtonClick)
finishButton.addEventListener('click', onFinishButtonClick)

getPendingTickets()
setDeskName()
connectToWebSockets(onWebSocketMessageCB)
