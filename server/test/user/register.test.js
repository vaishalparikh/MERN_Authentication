const {
  describe, it, after,
} = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const { UserModel } = require('../../src/models');

const deleteUser = async () => UserModel.deleteOne({ email: 'test12@gmail.com' });

chai.use(chaiHttp);
const { expect } = chai;
const baseUrl = '/user/register';

const headersObj = {};

describe('User Register Test Suit', async () => {
  after(async () => {
    await deleteUser({ userId: headersObj.userId });
  });
  // eslint-disable-next-line no-undef
  context(`POST ${baseUrl}`, () => {
    it('should give validation error because body contains a unknown field [xyz].', async () => {
      const body = {
        xyz: 1234,
        email: 'test12@gmail.com',
        password: 'not7Th@t',
        fullName: 'Testing',
      };

      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"xyz" is not allowed');
    });
    it('should give validation error because email can not be blank.', async () => {
      const body = {
        email: '',
        password: 'not7Th@t',
        fullName: 'Testing',
      };
      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"Email" is not allowed to be empty');
    });
    it('should give validation error because email can not be Number.', async () => {
      const body = {
        email: 1234,
        password: 'not7Th@t',
        fullName: 'Testing',
      };
      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"Email" must be a string');
    });
    it('should give user register successfully', async () => {
      const body = {
        email: 'test12@gmail.com',
        password: 'not7Th!s',
        fullName: 'test',
      };
      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
    });
    it('should give error because user already registed', async () => {
      const body = {
        email: 'test12@gmail.com',
        password: 'not7th@S',
        fullName: 'test',
      };
      const res = await chai
        .request(app)
        .post(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(400);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
    });
  });
});
