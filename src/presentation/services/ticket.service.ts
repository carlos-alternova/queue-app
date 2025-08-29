import { Ticket } from '../../domain/interfaces/ticket'

export class TicketService {
  constructor() {}

  private tickets: Ticket[] = []

  get getTickets() {
    return this.tickets
  }

  createTicket(ticket: Ticket) {
    console.log('el ticardo', ticket)
    try {
      this.tickets.push(ticket)
      return ticket
    } catch (error) {
      throw Error(`Can not add ticket: ${error}`)
    }
  }
}
