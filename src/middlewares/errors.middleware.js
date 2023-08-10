import EErrors from '../errors/enums.error.js'

export default (error, req, res, next) => {
  console.log(error.cause)

  switch (error.code) {
    case EErrors.PRODUCT_ERROR:
      res.status(400).send({ status: 'error', error: error.message, cause: error.cause })
      break

    case EErrors.CART_ERROR:
      res.status(400).send({ status: 'error', error: error.message, cause: error.cause })
      break

    case EErrors.DATABASES_ERROR:
      res.status(400).send({ status: 'error', error: error.message, cause: error.cause })
      break

    default:
      res.send({ status: 'error', error: 'Unexpected error' })
      break
  }
}
