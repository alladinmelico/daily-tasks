import { body, param } from 'express-validator'

export interface TaskRequest {
  name: string
  taskId: number
}

class TaskValidator {
  checkOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('Task ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
    ]
  }

  saveOne() {
    return [
      body('title').notEmpty().withMessage('Title is required.').isString(),
      body('description').isString(),
      body('isDone').isBoolean(),
    ]
  }

  updateOne() {
    return [
      param('id')
        .notEmpty()
        .withMessage('Task ID is required')
        .isUUID(4)
        .withMessage('Invalid ID format'),
      body('title').notEmpty().withMessage('Title is required.').isString(),
      body('description').isString(),
      body('isDone').isBoolean(),
    ]
  }
}

export default new TaskValidator()
