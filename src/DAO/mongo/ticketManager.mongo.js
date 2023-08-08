import TicketsSchema from './models/tickets.model.js'

class TicketsDAO {
  async getAll () {
    try {
      const tickets = await TicketsSchema.find({})
      return tickets
    } catch (error) {
      console.log(error)
    }
  }

  async getById (id) {
    try {
      const ticket = await TicketsSchema.findOne({ _id: id }).lean()
      return ticket
    } catch (error) {
      console.log(error)
    }
  }

  async add (ticket) {
    try {
      const newTicket = await TicketsSchema.create(ticket)
      return newTicket
    } catch (error) {
      console.log(error)
    }
  }
}

export default new TicketsDAO()
