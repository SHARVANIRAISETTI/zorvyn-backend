const bcrypt = require('bcryptjs');
const Joi = require('joi');
const { AppError } = require('../utils/error.utils');
const { createUser, findByEmail, findById } = require('../models/user.model');

const registerSchema = Joi.object({
  name: Joi.string().min(2).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  role: Joi.string().valid('Admin', 'Analyst', 'Viewer').required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const register = async (req, res, next) => {
  try {
    const { error, value } = registerSchema.validate(req.body);
    if (error) throw new AppError(400, error.details[0].message);

    const existing = await findByEmail(value.email);
    if (existing) throw new AppError(409, 'Email already registered');

    const hashed = await bcrypt.hash(value.password, 10);
    const user = {
      ...value,
      password: hashed,
      createdAt: new Date().toISOString(),
    };

    const saved = await createUser(user);
    return res.status(201).json({ id: saved.id, name: saved.name, email: saved.email, role: saved.role });
  } catch (err) {
    next(err);
  }
};

const login = async (req, res, next) => {
  try {
    const { error, value } = loginSchema.validate(req.body);
    if (error) throw new AppError(400, error.details[0].message);

    const user = await findByEmail(value.email);
    if (!user) throw new AppError(401, 'Invalid credentials');

    const valid = await bcrypt.compare(value.password, user.password);
    if (!valid) throw new AppError(401, 'Invalid credentials');

    // token is user id as requested
    return res.json({ token: user.id, role: user.role, name: user.name });
  } catch (err) {
    next(err);
  }
};

const getMe = async (req, res, next) => {
  try {
    const user = await findById(req.user.id);
    if (!user) throw new AppError(401, 'User not found');
    res.json({ id: user.id, name: user.name, email: user.email, role: user.role });
  } catch (err) {
    next(err);
  }
};

module.exports = { register, login, getMe };
