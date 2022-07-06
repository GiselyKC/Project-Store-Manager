const { expect } = require('chai');
const sinon = require('sinon');
const { execute } = require('../../../db');
const connection = require('../../../db');
const salesModel = require('../../../models/salesModel');

describe('Verifica ao chamar a rota /sales', () => {

  it('quando retorna as informações dos produtos', async () => {

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

      sinon.stub(connection, "execute").resolves(salesAll);
    });

    it('retorna um array com objetos', async () => {
      const result = await salesModel.getAllSales();

      expect(result).to.be.an("array");
      expect(result[0]).to.be.an("object");
    });
  });
});

describe('Verifica ao chamar a rota /sales/:id', () => {

  before(() => {
    const salesId = [
      { date: '2022-06-08T18:07:49.000Z', productId: 1, quantity: 5 },
      { date: '2022-06-08T18:07:49.000Z', productId: 2, quantity: 10 }
    ] 

    sinon.stub(connection, "execute").resolves(salesId);
  });

  after(() => {
    connection.execute.restore();
  });

  it('quando retorna as informações dos produtos do "id" especifico', async ()=> {
    const result = await salesModel.getByIdSales();

    expect(result).to.be.an("array");
    expect(result[0]).to.be.an("object");
  });

  it('verifica o argumento id solicitado', async () => {
    const idProducts = {
      id: undefined,
    };
    await salesModel.getByIdSales(idProducts);
    const spyCall = connection.execute.getCall(1);


    expect(spyCall.args[1]).to.deep.equal([idProducts]);
  });
})