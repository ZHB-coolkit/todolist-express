import _ from 'lodash'
import { ErrorResult } from '../model/Result'
import { verifyToken } from '../utils/jwt'
import { Request, Response } from 'express'

/**
 * 登录校验中间件
 * @param req 
 * @param res 
 * @param next 
 * @returns 
 */
const loginCheck = async (req: Request, res: Response, next: Function) => {
    const { headers: { authorization } } = req
    if (!authorization || !/^Bearer \S+/.test(authorization)) {
        res.json(new ErrorResult(401, 'Access without permission!'))
        return
    }
    let authorizationSplit = authorization.split('Bearer ')
    const token = authorizationSplit[1]
    let verifyRes
    try {
        verifyRes = await verifyToken(token)
    } catch (error) {
        res.json(new ErrorResult(401, 'Access without permission!'))
        return
    }
    const userId = _.get(verifyRes, 'id')
    res.locals.userId = userId
    next()
}

export { loginCheck }
