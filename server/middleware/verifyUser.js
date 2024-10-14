const jwt = require('jsonwebtoken');
const joi = require('joi');
require('dotenv').config();

const signupValidation=(req,res,next) => {
    const schema = joi.object({
        first_name: joi.string().min(1).max(100).required(),
        last_name: joi.string().min(1).max(100),
        email: joi.string().email().required(),
        password: joi.string().min(8).max(100).required(),
        password_confirmation: joi.string().min(8).max(100).required(),
        address: joi.string().min(1).max(100),
        marketing_accept: joi.boolean()
    });

    const { error } = schema.validate(req.body);
    if (error){
        return res.status(400).json({message: 'Bad request',error});
    }
    next();
};

const loginValidation=(req,res,next) => {
    const schema = joi.object({
        email: joi.string().email().required(),
        password: joi.string().required(),
    });

    const { error } = schema.validate(req.body);
    if (error){
        return res.status(400).json({message: 'Bad request',error});
    }
    next();
};


module.exports = {
    signupValidation,
    loginValidation,
};