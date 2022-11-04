import express from 'express'
import bcrypt from 'bcrypt'
import _ from 'lodash'
import UserModel from '../model/User'
import { SuccessResult, BadRequestErrorResult } from '../model/Result'
import { generateToken } from '../utils/jwt'
import loginServiceSchema from '../schema/user/loginPostServiceSchema'

var router = express.Router()

/**
 * 新增用户
 */
router.post('/', async (req, res, next) => {

  const errors = loginServiceSchema.validate(req.body)
  if (errors.length) {
    const message = _.get(errors[0], 'message')
    res.send(new BadRequestErrorResult(message))
    return
  }

  const { username, password } = req.body
  const user = await UserModel.findOne({ username }, '_id')
  if (user) {
    res.send(new BadRequestErrorResult('该用户已存在！'))
    return
  }
  const result = await UserModel.create({
    username,
    password
  })
  const { _id } = result
  res.send(new SuccessResult({
    _id,
    username
  }))

})

/**
 * 用户登录
 */
router.post('/login', async (req, res, next) => {

  const errors = loginServiceSchema.validate(req.body)
  if (errors.length) {
    const message = _.get(errors[0], 'message')
    res.send(new BadRequestErrorResult(message))
    return
  }

  const { username, password } = req.body
  const user = await UserModel.findOne({ username }, '_id, password')
  if (!user) {
    res.send(new BadRequestErrorResult('该用户不存在！'))
    return
  }
  
  const isPasswordValid = bcrypt.compareSync(password, user.password!)
  if (!isPasswordValid) {
    res.send(new BadRequestErrorResult('密码不正确！'))
    return
  }
  const token = generateToken(user._id.toString())
  res.send(new SuccessResult({
    _id: user._id,
    accessToken: token
  }, 'Login Success'))
  
})

export default router
