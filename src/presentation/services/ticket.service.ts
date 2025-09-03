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

  public drawTicket(desk: string) {
    const freeTicket = this.tickets.find(
      (ticket) => !ticket.handleAtDesk && !ticket.done
    )
    if (!freeTicket)
      return { status: 'error', message: 'All tickets are being handled' }

    freeTicket.handleAtDesk = desk
    freeTicket.handleAt = new Date()

    // TODO: Send to WebSocket

    return { status: 'ok', ticket: freeTicket }
  }

  public onFinishTicket(id: string) {
    const ticket = this.tickets.find((ticket) => ticket.id === id)

    if (!ticket)
      return { status: 'error', message: 'This ticket does not exist' }

    ticket.done = true
    return { status: 'ok', ticket }
  }
}
