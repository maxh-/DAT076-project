const models = require('../models');
const async = require('async');
const crypto = require('crypto');
const nodemailer = require('nodemailer');

exports.findUserById = async (id) => {
  const user = await models.User.findById(id);
  if(user){
    return {
      success: true,
      code: 200,
      user: user.toJSON()};
  }else {
    return {
      success: false,
      code: 404,
      message: "user not found"
    };
  }
};

exports.register = async (params) => {
  if(params.password === params.password2){
    const res = await models.User.findOrCreate({
      where: {email: params.email},
      defaults:{ password: params.password,
                 firstName: params.firstName,
                 lastName: params.lastName
               }
    });
    if(res[1]){
      const user = res[0];
      return {
        success: true,
        code: 201,
        user: user.toJSON()
      };
    }else{
      return {
        success: false,
        code: 304,
        message: "user already exists"
      };
    }
  }else{
    return {
      success: false,
      code: 400,
      message: "passwords dont match"
    };
  }
};


exports.forgotPassword = async (email, host) => {
  const buf = await crypto.randomBytes(20);
  const token = buf.toString('hex');

  const user = await models.User.find({where:{email:email}});
  if(user){
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000; // one hour

    await user.save();
  }else{
    return {
      success: false,
      code: 401,
      message: "no user with that email exists"
    };
  }
  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreplyrecept@gmail.com',
      pass: 'testpass'
    }
  });
  const mailOptions = {
    to: user.email,
    from: 'noreplyrecept@gmail.com',
    subject: 'Receptappen Password Reset',
    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
      'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
      'http://' + host + '/auth/reset/' + token + '\n\n' +
      'If you did not request this, please ignore this email and your password will remain unchanged.\n'
  };
  await smtpTransport.sendMail(mailOptions);
  return {
    success: true,
    code: 200,
    message: "Reset token sent by email"
  };
};

exports.checkResetToken = async (token) => {
  const user = await models.User.find({
    where:{resetPasswordToken:token,
           resetPasswordExpires: {$gt: Date.now()}}
  });
  if(user){
    return {
      success: true,
      code: 200,
      token: token
    };
  }else{
    return {
      success: false,
      code: 400,
      message: "reset token expired or does not exist"
    };
  }
  
};

exports.resetPassword = async (params, token) => {
  const user = await models.User.find({
    where:{resetPasswordToken:token,
           resetPasswordExpires: {$gt: Date.now()}}
  });
  if(user){
    if(params.password === params.password2){
      user.password = params.password;
      user.resetPasswordToken = null;
      user.resetPasswordExpires = null;

      await user.save();
    }else{
      return {
        success: false,
        code: 400,
        message: "passwords do not match"
      };
    }
  }else{
    return {
      success: false,
      code: 400,
      message: "token expired or does not exist"
    };
  }

  const smtpTransport = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'noreplyrecept@gmail.com',
      pass: 'testpass'
    }
  });
  const mailOptions = {
    to: user.email,
    from: 'noreplyrecept@gmail.com',
    subject: 'Your password has been changed',
    text: 'Hello,\n\n' +
      'This is a confirmation that the password for your account ' + user.email + ' has just been changed.\n'
  };
  await smtpTransport.sendMail(mailOptions);
  return {
    success: true,
    code: 200,
    message: "userpassword has been updated"
  }
};
