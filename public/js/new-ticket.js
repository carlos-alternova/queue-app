const lblNewTicket = document.getElementById('lbl-new-ticket')
const btnNewTicket = document.querySelector('button')

const getLastTicket = async () => {
  // send GET request to "/api/ticket/last"
  const data = await fetch('/api/ticket/last').then((resp) => resp.json())

  lblNewTicket.innerText = `Ticket: ${data}`
}

btnNewTicket.addEventListener('click', async () => {
  await fetch('/api/ticket/', { method: 'POST' })
  getLastTicket()
})

getLastTicket()
