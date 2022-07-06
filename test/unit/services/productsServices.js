const { expect } = require('chai');
const sinon = require('sinon');
const productsModel = require('../../../models/productsModel');
const productsService = require('../../../services/productsService');

// describe('Verifica ao chamar a rota /products', async () => {

//   before(() => {
//     const execute = [{}];

//     sinon.stub(productsModel, "getAllProducts").resolves(execute);
//   });

//   after(() => {
//     productsModel.getAllProducts.restore();
//   });

//   it('', async () => {
//     const result = await productsService.getAll();

//     expect(result).to.be.an("array");
//     expect(result[0]).to.be.an("object");
//   });
// });

describe('Verifica ao chamar a rota /products/:id', async () => {

  before(() => {
    const productsID = {
      "id": 1,
      "name": "produto A",
      "quantity": 10
    }

    sinon.stub(productsModel, "getByIdProducts").resolves([[productsID]]);
  });

  after(() => {
    productsModel.getByIdProducts.restore();
  });

  it('', async () => {
    const id = 1;
    const result = await productsService.getById(id);

    expect(result).to.be.an("object");
  });

  // it('', async () => {
  //   const idProducts = {
  //     id: undefined,
  //   };
  //   const result = await productsService.getById(idProducts);
  //   const spyCall = productsModel.getByIdProducts.getCall(1);

  //   expect(spyCall.args[0]).to.deep.equal(idProducts);
  // });

});

describe('Verifica ao chamar o ID incorreto na rota /products/:id', () => {

  before(() => {
    const productsID = undefined;

    sinon.stub(productsModel, "getByIdProducts").resolves([[productsID]]);
  });

  after(() => {
    productsModel.getByIdProducts.restore();
  });

  it('retorna o erro: "Product not found"', async () => {
    let errById = {};
    try {
      await productsService.getById();

    } catch (error) {
      errById = error;
    }
    expect(errById).to.deep.equal({ status: 404, message: 'Product not found' });
  });
});

// describe('Verifica a função getInfosProducts()', async () => {

//   before(() => {
//     const execute = [{}];

//     sinon.stub(productsModel, "getInfosProducts").resolves(execute);
//   });

//   after(() => {
//     productsModel.getInfosProducts.restore();
//   });

//   it('', async () => {
//     const result = await productsService.getInfos();

//     expect(result).to.be.an("array");
//     expect(result[0]).to.be.an("object");
//   });

//   it('', async () => {
//     const nameProducts = {
//       name: undefined,
//     };
//     const result = await productsService.getInfos(nameProducts);
//     const spyCall = productsModel.getInfosProducts.getCall(1);

//     expect(spyCall.args[0]).to.deep.equal(nameProducts);
//   });

// });
