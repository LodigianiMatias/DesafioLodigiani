import mockService from '../services/mockService.js'

class MockController {
  async getMockgingProducts (req, res) {
    const response = await mockService.getAllProducts()
    return res.status(response.status).json(response.result)
  }
}

export default new MockController()
