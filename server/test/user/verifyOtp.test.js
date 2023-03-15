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
  OTP: {
    otp: 1234,
    validTill: new Date(new Date().getTime() + 30 * 60000),
  },
});

const deleteUser = async ({ userId }) => UserModel.deleteOne({ _id: userId });

chai.use(chaiHttp);
const { expect } = chai;
const baseUrl = '/user/verify-otp';

const headersObj = {
  otp: '1234',
};

describe('User Verify Otp Test Suit', async () => {
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
        otp: headersObj.otp,
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
        otp: headersObj.otp,
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
    it('should give validation error because email can not be Number.', async () => {
      const body = {
        email: 1234,
        otp: headersObj.otp,
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
    it('should give error because user is not Found.', async () => {
      const body = {
        email: 'test126@gmail.com',
        otp: '1234',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
    });
    it('should give error because otp is Incorrect.', async () => {
      const body = {
        email: 'test12@gmail.com',
        otp: '0123',
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
    });
    it('should give user email verified successfully', async () => {
      const body = {
        email: 'test12@gmail.com',
        otp: headersObj.otp,
      };
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(true);
    });
    it('should give error because otp time expire', async () => {
      const body = {
        email: 'test12@gmail.com',
        otp: headersObj.otp,
      };
      const user = await UserModel.findOne({ _id: headersObj.userId });
      user.OTP.validTill = new Date(user.OTP.validTill.getTime() - 40 * 60000);
      await user.save();
      const res = await chai
        .request(app)
        .get(`${baseUrl}`)
        .send(body);
      expect(res.statusCode).to.equal(200);
      expect(res.body).to.be.an('object');
      expect(res.body.success).to.equal(false);
    });
  });
});
