import nodemailer from 'nodemailer';
const from = '"pawid" <info@pawid.com>'


function setup() {
  return nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    }
  });
}

const generateConfirmationUrl=(user)=>{
    return `${process.env.HOST}/confirm/${user.confirmationToken}`
}

export function sendConfirmationEmail(user){

    const transport = setup();
    const email = {
        from,
        to:user.username,
        subject:"Welcome to Pawid",
        text:`
        welcome to pawid . please, confirm your email.

        ${generateConfirmationUrl(user)}

        `
    }
    transport.sendMail(email)

}

const generateResetPasswordlink=(UserDao)=>{
    return `${process.env.HOST}/reset_password/${UserDao.generatePasswordToken(UserDao.info.username)}`
}
export function sendResetPasswordEmail(UserDao){

    const transport = setup();
    const email = {
        from,
        to:UserDao.info.username,
        subject:"Reset Password",
        text:`
        Please use this link to reset your password.

        ${generateResetPasswordlink(UserDao)}

        `
    }
    transport.sendMail(email)

}