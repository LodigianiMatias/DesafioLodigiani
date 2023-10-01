import { TicketModel } from './models/tickets.model.js'

class TicketsDAO {
  async getById (id) {
    try {
      const ticketDao = await TicketModel.findOne({ _id: id }).populate('products.idProduct').lean()
      console.log({ ticketDao })
      return ticketDao
    } catch (err) {
      console.log(err)
    }
  }

  async addTicket (newTicket) {
    try {
      const ticket = await (await TicketModel.create(newTicket)).populate('products.idProduct')
      console.log({ ticketProducts: ticket.products })
      ticket.code = ticket._id.toString()
      console.log({ ticket })
      await TicketModel.findByIdAndUpdate(ticket._id, { code: ticket.code })
      return ticket
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TicketsDAO()
