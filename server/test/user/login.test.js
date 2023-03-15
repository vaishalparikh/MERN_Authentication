const bcrypt = require('bcrypt');
const {
  describe, it, before, after,
} = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../../src/app');
const { UserModel } = require('../../src/models');

const createUser = async ({ password }) => UserModel.create({
  profilePic: '/test',
  fullName: 'test',
  email: 'test12@gmail.com',
  password,
});

const deleteUser = async ({ userId }) => UserModel.deleteOne({ _id: userId });

chai.use(chaiHttp);
const { expect } = chai;
const baseUrl = '/user/login';

const headersObj = {};

describe('User Login Test Suit', async () => {
  before(async () => {
    const password = await bcrypt.hash('not7Th!s', 10);
    const user = await createUser({ password });
    headersObj.userId = user._id;
  });
  after(async () => {
    await deleteUser({ userId: headersObj.userId });
  });
  // eslint-disable-next-line no-undef
  context(`GET ${baseUrl}`, () => {
    it('should give validation error because body contains a unknown field [xyz].', async () => {
      const body = {
        xyz: 1234,
        email: 'test12@gmail.com',
        password: 'not7Th!s',
      };

      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"xyz" is not allowed');
    });
    it('should give validation error because email can not be blank.', async () => {
      const body = {
        email: '',
        password: 'not7Th!s',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"Email" is not allowed to be empty');
    });
    it('should give validation error because password can not be blank.', async () => {
      const body = {
        email: 'test12@gmail.com',
        password: '',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"Password" is not allowed to be empty');
    });
    it('should give validation error because email can not be Number.', async () => {
      const body = {
        email: 1234,
        password: 'not7Th!s',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"Email" must be a string');
    });
    it('should give validation error because Password can not be Number.', async () => {
      const body = {
        email: 'test12@gmail.com',
        password: 1243,
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('"Password" must be a string');
    });
    it('should give error because user is not Found.', async () => {
      const body = {
        email: 'test126@gmail.com',
        password: 'not7Th!s',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
      expect(res.body.message).to.equal('Invalid credential');
    });
    it('should send otp for user login successfully', async () => {
      const body = {
        email: 'test12@gmail.com',
        password: 'not7Th!s',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
    });
    it('should give error because password is Incorrect.', async () => {
      await UserModel.findByIdAndUpdate(headersObj.userId, { isEmailVerified: true });
      const body = {
        email: 'test12@gmail.com',
        password: 'not7Th@t',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
    });
    it('should give user login successfully', async () => {
      const body = {
        email: 'test12@gmail.com',
        password: 'not7Th!s',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
    });
  });
});
