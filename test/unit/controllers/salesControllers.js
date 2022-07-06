const { expect } = require('chai');
const sinon = require('sinon');
const salesService = require('../../../services/salesService');
const salesController = require('../../../controllers/salesController');

describe('Verifica ao chamar a rota /sales', async () => {
  const salesAll =  [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ]

  const response = {};
  const request = {};

  before(() => {
    request.body = {};
  
    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, "getAll").resolves(salesAll);
  });
  
  after(() => {
    salesService.getAll.restore();
  });

  it("é chamado o status com o código 200", async () => {
    await salesController.getAll(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

});

describe('Verifica ao chamar a rota /sales/:id', async () => {

  const salesId =  [
    { date: '2022-06-08T20:09:29.000Z', productId: 1, quantity: 5 },
  ]

  const response = {};
  const request = {};

  before(() => {
    request.params = {id: undefined};

    response.status = sinon.stub().returns(response);
    response.json = sinon.stub().returns();

    sinon.stub(salesService, "getById").resolves(salesId);
  });
  
  after(() => {
    salesService.getById.restore();
  });

  it('é chamado o status com o código 200', async () => {
    await salesController.getById(request, response);

    expect(response.status.calledWith(200)).to.be.equal(true);
  });

});