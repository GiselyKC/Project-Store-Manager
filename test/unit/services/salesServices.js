const { expect } = require('chai');
const sinon = require('sinon');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');

describe('Verifica ao chamar a rota /sales', async () => {

  before(() => {
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

    sinon.stub(salesModel, "getAllSales").resolves(salesAll);
  });

  after(() => {
    salesModel.getAllSales.restore();
  });

  it('retorna um array com objetos', async () => {
    const result = await salesService.getAll();

    expect(result).to.be.an("array");
    expect(result[0]).to.be.an("object");
  });
});

describe('Verifica ao chamar a rota /sales/:id', async () => {
  
  before(() => {
    const salesId = [
      { date: '2022-06-08T18:07:49.000Z', productId: 1, quantity: 5 },
      { date: '2022-06-08T18:07:49.000Z', productId: 2, quantity: 10 }
    ] 

    sinon.stub(salesModel, "getByIdSales").resolves([salesId]);
  });

  after(() => {
    salesModel.getByIdSales.restore();
  });

  it('quando retorna as informações dos produtos do "id" especifico', async ()=> {
    const result = await salesService.getById();

    expect(result).to.be.an("array");
    expect(result[0]).to.be.an("object");
  });

  it('verifica o argumento id solicitado', async () => {
    const idProducts = {
      id: undefined,
    };
    await salesService.getById(idProducts);
    const spyCall = salesModel.getByIdSales.getCall(1);

    expect(spyCall.args[0]).to.deep.equal(idProducts);
  });

});

describe('Verifica ao chamar o ID incorreto na rota /sales/:id', () => {

  before(() => {
    const salesID = undefined;

    sinon.stub(salesModel, "getByIdSales").resolves([salesID]);
  });

  after(() => {
    salesModel.getByIdSales.restore();
  });

  it('retorna o erro: "Sale not found"', async () => {
    let errById = {};
    try {
      await salesService.getById();
    } catch (error) {
      errById = error;
    }
    expect(errById).to.deep.equal({ status: 404, message: 'Sale not found' });
  });

});