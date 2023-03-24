import { validationResult } from 'express-validator'
import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'
const dotenv = require('dotenv')

class Middleware {
  handleValidation(req: Request, res: Response, next: NextFunction) {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.json(errors)
    }
    next()
  }
}

export default new Middleware()
