import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamModel from '../database/models/TeamModel';

import { teams } from './mock/teamMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Testes referentes aos Teams', () => {
  afterEach(() => sinon.restore());

  it('Teste se é retornado a lista completa de times', async () => {
    sinon.stub(TeamModel, 'findAll').resolves(teams as TeamModel[]);
    const response = await chai.request(app).get('/teams');

    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams);
  });

  it('Teste se é retornado um time específico com um id', async () => {
    sinon.stub(TeamModel, 'findOne').resolves(teams[1] as TeamModel);
    const response = await chai.request(app).get('/teams/1');
    expect(response.status).to.be.equal(200);
    expect(response.body).to.be.deep.equal(teams[1]);
  });
});
