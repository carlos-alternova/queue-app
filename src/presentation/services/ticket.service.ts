import { UuidAdapter } from '../../config/uuid.adapter'
import { Ticket } from '../../domain/interfaces/ticket'

export class TicketService {
  constructor() {}

  private tickets: Ticket[] = []

  public get getTickets() {
    return this.tickets
  }

  public get getPendingTickets() {
    return this.tickets.filter((ticket) => !ticket.handleAtDesk && !ticket.done)
  }

  public lastTicketNumber() {
    return this.tickets.length > 0 ? this.tickets.at(-1)!.number : 0
  }

  public createTicket() {
    const newTicket: Ticket = {
      id: UuidAdapter.v4(),
      number: this.lastTicketNumber() + 1,
      createdAt: new Date(),
      done: false,
    }

    try {
      this.tickets.push(newTicket)
      // TODO: Send to WebSocket
      return newTicket
    } catch (error) {
      throw Error(`Can not add ticket: ${error}`)
    }
  }
}
