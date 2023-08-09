import { TicketModel } from './models/tickets.model.js'

class TicketsDAO {
  async getAll () {
    try {
      return await TicketModel.find({})
    } catch (err) {
      console.log(err)
    }
  }

  async getById (id) {
    try {
      return await TicketModel.findOne({ _id: id }).lean()
    } catch (err) {
      console.log(err)
    }
  }

  async add (ticket) {
    try {
      const newTicket = await TicketModel.create(ticket)
      return newTicket
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TicketsDAO()
