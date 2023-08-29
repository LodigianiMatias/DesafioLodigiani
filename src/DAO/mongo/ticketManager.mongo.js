import { TicketModel } from './models/tickets.model.js'

class TicketsDAO {
  async getById (id) {
    try {
      return await TicketModel.findOne({ _id: id }).lean()
    } catch (err) {
      console.log(err)
    }
  }

  async addTicket (newTicket) {
    try {
      const ticket = await TicketModel.create(newTicket)
      ticket.code = ticket._id.toString()
      await TicketModel.findByIdAndUpdate(ticket._id, { code: ticket.code })
      return ticket
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TicketsDAO()
