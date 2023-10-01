import cartService from '../services/cartService.js'
import ticketDao from '../DAO/mongo/ticketManager.mongo.js'
import ticketService from '../services/ticketService.js'

class TicketsController {
  async addTicket (req, res) {
    try {
      const user = req.session.user
      const userCartId = req.params.cid
      const purchaser = user.email
      const ticketPreview = await ticketService.stockCartProductsForTicket(userCartId)
      console.log({ ticketPreview })
      const ticket = ticketPreview.cartWithStock
      const totalCart = ticketPreview.totalPriceTicket
      const oldProductsCart = ticketPreview.cartWithOutStock

      console.log({ oldProductsCart })
      await cartService.updateCart(userCartId, oldProductsCart)
      const ticketCreated = await ticketService.addTicket(purchaser, ticket, totalCart)
      return res.status(200).json({ ticket: ticketCreated, totalCart, purchaser })
    } catch (err) {
      res.status(500).json({ Error: `${err}` })
    };
  };

  async checkOut (req, res) {
    try {
      const ticketId = req.params.tid
      const ticket = await ticketDao.getById(ticketId)
      return res.render('finishticket', { ticket, totalCart: ticket.amount, purchaser: ticket.purchaser })
    } catch (err) {
      res.status(500).json({ Error: `${err}` })
    };
  };
};

export default new TicketsController()
