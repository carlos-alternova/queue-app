import { Request, Response } from 'express'
import { TicketService } from '../services/ticket.service'
import { UuidAdapter } from '../../config/uuid.adapter'

export class TicketController {
  // DI - WSS service
  constructor(private ticketService: TicketService) {}

  public getTickets = async (req: Request, res: Response) => {
    const tickets = this.ticketService.getTickets
    res.json({ tickets })
  }

  public getLastTicket = async (req: Request, res: Response) => {
    res.json('getLastTicket')
  }

  public getPendingTickets = async (req: Request, res: Response) => {
    res.json('getPendingTickets')
  }

  public createTicket = async (req: Request, res: Response) => {
    const ticketInfo = req.body
    const newTicket = {
      id: UuidAdapter.v4(),
      ...ticketInfo,
    }
    const addedTicket = this.ticketService.createTicket(newTicket)
    res.status(202).json({ message: `Ticket added: ${addedTicket}` })
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params
    res.json(`drawTicket: ${desk}`)
  }

  public markTicketAsDone = async (req: Request, res: Response) => {
    const { ticketId } = req.params
    res.json(`markTicketAsDone: ${ticketId}`)
  }

  public getWorkingOnTickets = async (req: Request, res: Response) => {
    res.json('getWorkingOnTickets')
  }
}
