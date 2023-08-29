import cartService from './cartService.js'
import { ticketDAO } from '../DAO/ticketDAO.js'
import { v4 as uuidv4 } from 'uuid'

export class TicketService {
  async addTicket (purchaser, ticket, totalCart) {
    try {
      const ticketData = {
        code: uuidv4(),
        purchase_datetime: new Date(),
        amount: totalCart,
        purchaser,
        products: ticket
      }
      const savedTicket = await ticketDAO.addTicket(ticketData)
      return savedTicket
    } catch (error) {
      console.log(error)
    }
  }

  async stockCartProductsForTicket (cartId) {
    try {
      const cartProductsTicket = await cartService.getProductsByCartId(cartId)
      const cartWithStock = []
      const cartWithOutStock = []
      let totalPriceTicket = 0

      cartProductsTicket.cartProducts.forEach((item) => {
        const idProduct = item.idProduct
        const quantityInCart = parseInt(item.quantity)
        const availableStock = parseInt(idProduct.stock)
        const ticketAmount = parseInt(idProduct.price)

        if (quantityInCart <= availableStock) {
          const totalPriceProduct = ticketAmount * quantityInCart
          cartWithStock.push({ idProduct, quantity: quantityInCart, totalPrice: totalPriceProduct })
          totalPriceTicket += totalPriceProduct
        } else {
          cartWithOutStock.push({ idProduct, quantity: quantityInCart })
        }
      })

      return { cartWithStock, cartWithOutStock, totalPriceTicket }
    } catch (err) {
      throw new Error('ERROR.')
    }
  }

  // FIN LLAVE TICKETSERVICE
};

export default new TicketService()
