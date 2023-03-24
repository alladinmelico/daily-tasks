import express from 'express'
import taskValidator from './TaskValidator'
import middleware from '../middleware'
import taskController from './TaskController'

const router = express.Router()

router
  .get('/tasks', taskController.index)
  .post(
    '/tasks',
    taskValidator.saveOne(),
    middleware.handleValidation,
    taskController.save
  )
  .get(
    '/tasks/:id',
    taskValidator.checkOne(),
    middleware.handleValidation,
    taskController.show
  )
  .put(
    '/tasks/:id',
    taskValidator.updateOne(),
    middleware.handleValidation,
    taskController.update
  )
  .patch(
    '/tasks/status/:id',
    taskValidator.checkOne(),
    middleware.handleValidation,
    taskController.updateStatus
  )
  .delete(
    '/tasks/:id',
    taskValidator.checkOne(),
    middleware.handleValidation,
    taskController.delete
  )

export default router
