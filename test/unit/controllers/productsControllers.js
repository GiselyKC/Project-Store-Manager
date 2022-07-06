const { expect } = require('chai');
const sinon = require('sinon');
const productsService = require('../../../services/productsService');
const productsController = require('../../../controllers/productsController');

describe('Verifica ao chamar a rota /products', async () => {

  const products =  [
    {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    },
    {
      "id": 2,
      "name": "produto B",
      "quantity": 20
    }
  ]

  const response = {};
  const request = {};

  before(() => {
    request.body = {};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(productsService, "getAll").resolves(products);
  });

  after(() => {
    productsService.getAll.restore();
  });

  it("é chamado o status com o código 200", async () => {
    await productsController.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});

describe('Verifica ao chamar a rota /products/:id', async () => {

  const productsID = {
    "id": 1,
    "name": "produto A",
    "quantity": 10
  }

  const response = {};
  const request = {};

  before(() => {
    request.params = {id: 1};
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();
  
    sinon.stub(productsService, "getById").resolves(productsID);
  });
  
  after(() => {
    productsService.getById.restore();
  });

  it('é chamado o status com o código 200', async () => {
    await productsController.getById(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });
});



