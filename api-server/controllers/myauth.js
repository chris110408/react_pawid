/**
 * Created by leichen on 12/02/2018.
 */
import express from 'express';
import jwt from 'jsonwebtoken';
import UserDAO from '../models/myUser';
import { sendResetPasswordEmail } from '../mailer';

const router = express.Router();

const asyncMiddleware = async (req, res, next) => {
  const { username, password } = req.body;
  const userinfo = await UserDAO.getUserInfo(username);

  const compareResult = await UserDAO.comparePassword(password);

  if (userinfo && compareResult) {
    const data = UserDAO.toAuthJson();
    console.log(data);
    req.data = data;
  }

  next();
};

router.post('/', asyncMiddleware, (req, res) => {
  const data = req.data;
  if (data) {
    res.json(data);
  } else {
    res.status(400).json({ errors: { global: 'invalid credentials' } });
  }
});

const verifyEmailAsyncMiddleware = async (req, res, next) => {
  const { username } = req.body;
  const userinfo = await UserDAO.getUserInfo(username);
  if (userinfo) {
    sendResetPasswordEmail(UserDAO);
    req.data = { verifed: true };
    next();
  }

  req.data = { verifed: false };

  next();
};

router.post('/verify_email', verifyEmailAsyncMiddleware, (req, res) => {
  const data = req.data;
  if (data) {
    res.json(data);
  } else {
    res.status(400).json({ errors: { global: 'invalid credentials' } });
  }
});

const verifyTokenAsyncMiddleware = async (req, res, next) => {
  const { token } = req.body;
  const verifyResponse = await jwt.verify(token, process.env.SECRETKEY, (err, result) => {
    if (err) {
      return err;
    }
    return result;
  });


  req.data = verifyResponse;

  next();
};

router.post('/verify_token', verifyTokenAsyncMiddleware, (req, res) => {
  const data = req.data;
  if (data.username) {
    res.json(data.username);
  } else {
    res.json({ errors: 'invalid token or token is expired please apply a new password again'  });
  }
});


const resetPasswordAsyncMiddleware = async (req, res, next) => {
    const {userinfo} = req.body;
    const newuser = await UserDAO.updatePassword(userinfo)

    if (!newuser){
        req.data ={error:true}
        next()
    }
    console.log(newuser)
    req.data = {status:'success'};

    next();
};

router.post('/reset_password', resetPasswordAsyncMiddleware, (req, res) => {
    const data = req.data;
    if (!data.error) {
        res.json(data.status);
    } else {
        res.json({ errors: 'have probelm to reset password'  });
    }
});

export default router;
