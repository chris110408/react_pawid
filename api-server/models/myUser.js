/**
 * Created by leichen on 12/02/2018.
 */

import bcrypt from 'bcrypt';
import mongoose from 'mongoose';
import jwt from 'jsonwebtoken';
import uniqueValidator from 'mongoose-unique-validator';
import { sendConfirmationEmail } from '../mailer';

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, lowercase: true,index:true },
    passwordHash: { type: String, required: true },
    usertype: { type: String, required: true },
    confirmationToken: { type: String, default: '' }
  },
  { timestamps: true }
);

const comparePassword = async function(password) {
  if (this.info) {
    const res = await bcrypt.compare(password, this.info.passwordHash);
    return res;
  }
};

const generatJWT = function(username) {
  return jwt.sign(
    {
      username: username
    },
    process.env.SECRETKEY
  );
};

const generatePasswordToken = function(username) {
  return jwt.sign(
    {
      username: username
    },
    process.env.SECRETKEY,
    { expiresIn: '1h' }
  );
};

const toAuthJson = function() {
  return {
    username: this.info.username,
    usertype: this.info.usertype,
    confirmationToken: '',
    token: this.generatJWT(this.info.username)
  };
};

userSchema.plugin(uniqueValidator, { message: 'this username is already taken' });

const User = mongoose.model('User', userSchema);

const UserDAO = function() {};

const getUserInfo = async function(username) {
  const userInfo = await User.findOne({ username: username });
  console.log(userInfo);
  this.info = await userInfo;
  return this.info;
};

const createNewUser = async function(userData) {
  const { username, password } = userData;
  const user = new User({ username });
  user.passwordHash = await bcrypt.hash(password, 10);
  user.usertype = process.env.USER_TYPE_REG;
  user.confirmationToken = generatJWT(username);
  const saveResponese = await user.save().catch(err => err);
  if (!saveResponese.errors) {
    sendConfirmationEmail(saveResponese);
  }

  return saveResponese;
};

const updateconfirmToken = async token => {
  const newUser = await User.findOneAndUpdate(
    { confirmationToken: token },
    { usertype: process.env.USER_TYPE_CONFIRMED },
    { new: true }
  );

  return newUser;
};

const updatePassword = async userinfo => {

  const { username, password } = userinfo;

  const passwordHash = await bcrypt.hash(password, 10);
  const newUser = await User.findOneAndUpdate({ username: username }, { passwordHash:passwordHash }, {new:true});
  return newUser
};

UserDAO.prototype.updatePassword = updatePassword;
UserDAO.prototype.generatePasswordToken = generatePasswordToken;
UserDAO.prototype.updateconfirmToken = updateconfirmToken;
UserDAO.prototype.createNewUser = createNewUser;
UserDAO.prototype.comparePassword = comparePassword;
UserDAO.prototype.getUserInfo = getUserInfo;
UserDAO.prototype.generatJWT = generatJWT;
UserDAO.prototype.toAuthJson = toAuthJson;

module.exports = new UserDAO();
