import express from 'express'
import _ from 'lodash'
import TodoModel from '../model/Todo'
import { SuccessResult, BadRequestErrorResult, PermissionErrorResult } from '../model/Result'
import todoListGetSchema from '../schema/todo/todoListGetSchema'
import todoPatchSchema from '../schema/todo/todoPatchSchema'
import todoPostSchema from '../schema/todo/todoPostSchema'
import todoPutSchema from '../schema/todo/todoPutSchema'
import { loginCheck } from '../middleware/userMiddleware'
import { ETodoStatus } from '../ts/enum/ETodo'

const router = express.Router()

/**
 * 新增 todo
 */
router.post('/', loginCheck, async (req, res, next) => {

    const { content } = req.body
    const errors = todoPostSchema.validate({ content })
    if (errors.length) {
        const message = _.get(errors[0], 'message')
        res.send(new BadRequestErrorResult(message))
        return
    }
    
    const userId = res.locals.userId   
    if (!userId) {
        res.send(new PermissionErrorResult())
        return
    }

    const result = await TodoModel.create({ content, userId })
    res.send(new SuccessResult(result))

})

/**
 * 编辑 todo
 */
router.put('/:id', loginCheck, async (req, res, next) => {

    const { body: { content }, params: { id } } = req
    const errors = todoPutSchema.validate({ content })
    if (errors.length) {
        const message = _.get(errors[0], 'message')
        res.send(new BadRequestErrorResult(message))
        return
    }

    const userId = res.locals.userId    
    if (!userId) {
        res.send(new PermissionErrorResult())
        return
    }

    const todo = await TodoModel.findOne({
        _id: id,
        userId
    }, 'userId')
    
    if (!todo) {
        res.send(new BadRequestErrorResult('Data not found!'))
        return
    }

    const result = await TodoModel.findByIdAndUpdate(id, { content })
    res.send(new SuccessResult(result))

})

/**
 * 更新 todo 状态
 */
router.patch('/:id', loginCheck, async (req, res, next) => {

    const { body: { status }, params: { id } } = req
    const errors = todoPatchSchema.validate({ status })
    if (errors.length) {
        const message = _.get(errors[0], 'message')
        res.send(new BadRequestErrorResult(message))
        return
    }

    const userId = res.locals.userId    
    if (!userId) {
        res.send(new PermissionErrorResult())
        return
    }

    const todo = await TodoModel.findOne({
        _id: id,
        userId
    }, 'userId')

    if (!todo) {
        res.send(new BadRequestErrorResult('Data not found!'))
        return
    }

    const result = await TodoModel.findByIdAndUpdate(id, { status: Number(status) })
    res.send(new SuccessResult(result))
})

/**
 * 软删除
 */
router.delete('/:id', loginCheck, async (req, res, next) => {

    const userId = res.locals.userId    
    if (!userId) {
        res.send(new PermissionErrorResult())
        return
    }

    const { id } = req.params
    const todo = await TodoModel.findOne({
        _id: id,
        userId,
        status: {
            $ne: ETodoStatus.DELETED
        }
    }, 'userId')

    if (!todo) {
        res.send(new BadRequestErrorResult('Data not found!'))
        return
    }

    const result = await TodoModel.findByIdAndUpdate(id, { status: ETodoStatus.DELETED })
    res.send(new SuccessResult(result))
})

/**
 * 获取 todolist
 */
router.get('/list', loginCheck, async (req, res, next) => {

    const { keyword, status } = req.query
    const errors = todoListGetSchema.validate({ keyword, status })
    if (errors.length) {
        const message = _.get(errors[0], 'message')
        res.send(new BadRequestErrorResult(message))
        return
    }

    const userId = res.locals.userId
    if (!userId) {
        res.send(new PermissionErrorResult())
        return
    }
    let filter
    if (status) {
        filter = {
            $and: [
                {
                    content: {
                        $regex: new RegExp(keyword as string, 'i')
                    }
                },
                {
                    status: { 
                        $ne: -1
                    }
                },
                {
                    status: { 
                        $in: [status]
                    }
                },
                {
                    userId
                }
            ]
            
        }
    } else {
        filter = {
            $and: [
                {
                    content: {
                        $regex: new RegExp(keyword as string, 'i')
                    }
                },
                {
                    status: { 
                        $ne: -1
                    }
                },
                {
                    userId
                }
            ]
            
        }
    }
    
    const result = await TodoModel.find(filter, 'id content status')
    res.send(new SuccessResult(result))

})

export default router
