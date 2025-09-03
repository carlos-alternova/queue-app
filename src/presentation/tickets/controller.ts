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
    res.json(this.ticketService.lastTicketNumber)
  }

  public getPendingTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.getPendingTickets)
  }

  public createTicket = async (req: Request, res: Response) => {
    const addedTicket = this.ticketService.createTicket()
    res.status(202).json({ addedTicket })
  }

  public drawTicket = async (req: Request, res: Response) => {
    const { desk } = req.params
    res.json(this.ticketService.drawTicket(desk))
  }

  public markTicketAsDone = async (req: Request, res: Response) => {
    const { ticketId } = req.params
    res.status(201).json(this.ticketService.onFinishTicket(ticketId))
  }

  public getWorkingOnTickets = async (req: Request, res: Response) => {
    res.json(this.ticketService.lastHandlingTickets)
  }
}
