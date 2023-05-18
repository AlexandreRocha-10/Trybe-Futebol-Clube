import * as sinon from 'sinon';
import * as chai from 'chai';
import * as bcrypt from 'bcryptjs';
import * as jwt from 'jsonwebtoken';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import UserModel from '../database/models/UserModel';

import { user } from './mock/userMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes referentes aos Users', () => {
  afterEach(() => sinon.restore());

  it('Teste se é retornado o token com um email e senhas válidos', async () => {
    sinon.stub(UserModel, 'findOne').resolves(user as UserModel);
    sinon.stub(bcrypt, 'compareSync').resolves(user.password);

    const response = await chai.request(app).post('/login')
      .send({
        email: user.email,
        password: user.password
      });

    expect(response.status).to.be.equal(200);
    expect(response.body).not.to.be.empty;
  });

  it('Teste se quando não são preenchidos email ou senha é retornado erro', async () => {
    const response = await chai.request(app).post('/login');

    expect(response.status).to.be.equal(400);
    expect(response.body).to.be.deep.equal({ message: 'All fields must be filled' });
  });

  it('Teste se quando email ou senha não existem é retornado erro', async () => {
    sinon.stub(UserModel, 'findOne').resolves(undefined);

    const response = await chai.request(app).post('/login')
      .send({
        email: 'erro@email.com',
        password: 'erro123'
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });

  it('Teste se quando senha não existe é retornado erro', async () => {
    sinon.stub(UserModel, 'findOne').resolves(undefined);

    const response = await chai.request(app).post('/login')
      .send({
        email: user.email,
        password: 'erro123'
      });

    expect(response.status).to.be.equal(401);
    expect(response.body).to.be.deep.equal({ message: 'Invalid email or password' });
  });
});