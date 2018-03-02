/**
 * Created by leichen on 12/02/2018.
 */
import express from 'express';
import uniqueValidator from 'mongoose-unique-validator';
import UserDAO from '../models/myUser';
const router = express.Router();

const asyncMiddleware = async (req, res, next) => {
  const { username, password } = req.body;

  const respond = await UserDAO.createNewUser({ username, password });
  if (respond) {
    req.data = respond;
  }
  next();
};

router.post('/', asyncMiddleware, (req, res) => {
  const data = req.data;

  if (data) {
    res.json(data);
  } else {
    res.status(400).json({ errors: { global: 'signup errors' } });
  }
});

const asyncConfirmMiddleware = async (req, res, next) => {
  const { confirmToken } = req.body;
  req.data = await UserDAO.updateconfirmToken(confirmToken);

  next();
};

router.post('/confirm', asyncConfirmMiddleware, (req, res) => {
  const data = req.data;

  if (data) {
    const { username, usertype } = data;
    UserDAO.info = { username, usertype };
    const ret = UserDAO.toAuthJson()
    res.json(UserDAO.toAuthJson());
  } else {
    res.json({ errors: 'wrong confirmationToken' });
  }
});

export default router;
