import connectToWebSockets from './socket-client.js'

// HTML elements references:
const primaryTicketNumber = document.getElementById('lbl_ticket_01')
const primaryTicketDesk = document.getElementById('lbl_desk_01')
const secondaryTicketNumbers = Array.from(
  document.getElementsByClassName('ticketNumberSecondary')
)
const secondaryTicketDesks = Array.from(
  document.getElementsByClassName('ticketDeskSecondary')
)

const getAttendingTickets = async () => {
  const handlingTickets = await fetch('/api/ticket/working-on').then((data) =>
    data.json()
  )

  primaryTicketNumber.innerText = `# ${handlingTickets.at(0).number}`
  primaryTicketDesk.innerText = handlingTickets.at(0).handleAtDesk

  handlingTickets.slice(1, 4).forEach((ticket, index) => {
    secondaryTicketNumbers.at(index).innerText = `# ${ticket.number}`
    secondaryTicketDesks.at(index).innerText = ticket.handleAtDesk
  })
}

const onWebSocketMessageCB = (type, payload) => {
  switch (type) {
    case 'onTicketDone':
    case 'onTicketCountChanged':
    case 'onTicketDrawn':
      getAttendingTickets()
      break
    default:
      console.log('event data:', { type, payload })
      break
  }
}

getAttendingTickets()
connectToWebSockets(onWebSocketMessageCB)
