const { expect } = require('chai');
const sinon = require('sinon');
const connection = require('../../../db');
const productsModel = require('../../../models/productsModel');

describe('Verifica o endpoint GET da rota /products', () => {

  describe('quando retorna as informações dos produtos', async () => {

    before(() => {
      const execute = [{}];
  
      sinon.stub(connection, "execute").resolves(execute);
    });
  
    after(() => {
      connection.execute.restore();
    });

    it('retorna um array com objetos', async () => {
      const result = await productsModel.getAllProducts();

      expect(result).to.be.an("array");
      expect(result[0]).to.be.an("object");
    })

    it('retorna "SELECT * FROM StoreManager.products"', async () => {
      await productsModel.getAllProducts();
      // espiona, verifica a chamada da função como argumento.
      const spyCall = connection.execute.getCall(1);

      expect(spyCall.args).to.deep.equal(["SELECT * FROM StoreManager.products"]);
    });

  });

});

describe('Verifica o endpoint GET da rota /products/:id', () => {

  describe('quando retorna as informações dos produtos do "id" especifico', async () => {

    before(() => {
      const execute = [{}];

      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array com objetos', async () => {
      const result = await productsModel.getByIdProducts();

      expect(result).to.be.an("array");
      expect(result[0]).to.be.an("object");
    });

    it('retorna "SELECT * FROM StoreManager.products WHERE id = ?"', async () => {
      const idProducts = {
        id: undefined,
      };
      await productsModel.getByIdProducts(idProducts);
      const spyCall = connection.execute.getCall(1);

      expect(spyCall.args[0]).to.deep.equal("SELECT * FROM StoreManager.products WHERE id = ?");
      expect(spyCall.args[1]).to.deep.equal([idProducts]);
    });

  });
});

describe('Verifica a função getInfosProducts()', () => {
  
  describe('quando retorna o "name" do produto especifico', () => {

    before(() => {
      const execute = [{}];

      sinon.stub(connection, "execute").resolves(execute);
    });

    after(() => {
      connection.execute.restore();
    });

    it('retorna um array com objetos', async () => {
      const result = await productsModel.getInfosProducts();

      expect(result).to.be.an("array");
      expect(result[0]).to.be.an("object");
    });

    it('retorna "SELECT * FROM StoreManager.products WHERE StoreManager.products.name = ?"', async () => {
      const nameProducts = {
        name: undefined,
      };
      const result = await productsModel.getInfosProducts(nameProducts);
      const spyCall = connection.execute.getCall(1);

      expect(spyCall.args[0]).to.deep.equal(
        "SELECT * FROM StoreManager.products WHERE StoreManager.products.name = ?"
      );
      expect(spyCall.args[1]).to.deep.equal([nameProducts]);
    });
  });

});

describe('Verifica o endpoint POST da rota /products', () => {
  
  before(() => {
    const insertProduct = {};

    sinon.stub(connection, "execute").resolves([insertProduct]);
  });

  after(() => {
    connection.execute.restore();
  });

  it('insere um objeto', async () => {
    const result = await productsModel.postAddProducts();

    expect(result).to.be.an("object");
  });

});