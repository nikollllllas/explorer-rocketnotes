const { compare } = require('bcryptjs')
const { sign } = require('jsonwebtoken')
const knex = require('../database/knex')
const authConfig = require('../configs/auth')
const AppError = require('../utils/AppError')

class SessionsController {
  async create(req, res) {
    const { email, password } = req.body	

    const user = await knex('users').where({ email }).first()

    const passwordMatched = await compare(password, user.password)
    
    if (!user) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    if (!passwordMatched) {
      throw new AppError('Incorrect email/password combination.', 401)
    }

    const { secret, expiresIn } = authConfig.jwt
    const token = sign({}, secret, {
      subject: String(user.id),
      expiresIn
    })

    return res.json({ user, token })
  }
}

module.exports = SessionsController