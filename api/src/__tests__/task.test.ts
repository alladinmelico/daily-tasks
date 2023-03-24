import { app, server } from '../server'
import request from 'supertest'
import { TaskModel } from '../task/TaskModel'
import { v4 as uuidv4 } from 'uuid'
import { faker } from '@faker-js/faker'
const taskPayload = {
  title: faker.lorem.text(),
  description: faker.lorem.sentence(),
  isDone: false,
}

interface ITaskResponse {
  id: string
  title: string
  description: string
  isDone: boolean
  createdAt: string
  updatedAt: string
}

describe('TaskController', () => {
  afterAll(async () => {
    await server.close()
  })

  describe('GET /api/tasks', () => {
    it('should return list of tasks', async () => {
      const { body, statusCode } = await request(app).get('/api/tasks')
      expect(statusCode).toBe(200)
      expect(body).toEqual({
        data: expect.any(Array<ITaskResponse>),
        message: 'Tasks successfully retrieved.',
      })
    })
  })

  describe('GET /api/tasks/:id', () => {
    describe('given the task is not existing', () => {
      it('should return a 404', async () => {
        const { statusCode } = await request(app).get(`/api/tasks/${uuidv4()}`)
        expect(statusCode).toBe(404)
      })
    })
    describe('given the task is existing', () => {
      it('should return a 200', async () => {
        const createdTask = await TaskModel.create({
          ...taskPayload,
          id: uuidv4(),
        })
        const { body, statusCode } = await request(app).get(
          `/api/tasks/${createdTask.dataValues.id}`
        )
        expect(statusCode).toBe(200)
        expect(body).toEqual({
          data: {
            ...taskPayload,
            id: createdTask.dataValues.id,
            createdAt: expect.any(String),
            updatedAt: expect.any(String),
          },
          message: 'Task successfully retrieved.',
        })
      })
    })
  })

  describe('POST /api/tasks', () => {
    it('should return a 200 and create the task', async () => {
      const { statusCode, body } = await request(app)
        .post('/api/tasks')
        .send(taskPayload)
      expect(statusCode).toBe(200)

      expect(body).toEqual({
        data: {
          ...taskPayload,
          id: expect.any(String),
          createdAt: expect.any(String),
          updatedAt: expect.any(String),
        },
        message: 'Task successfully created.',
      })
    })
  })

  describe('PUT /api/tasks:id', () => {
    it('should return a 200 and update the task', async () => {
      const createdTask = await TaskModel.create({
        ...taskPayload,
        id: uuidv4(),
      })
      const { statusCode, body } = await request(app)
        .put(`/api/tasks/${createdTask.dataValues.id}`)
        .send(taskPayload)
      expect(statusCode).toBe(200)

      expect(body).toEqual({
        message: 'Task successfully updated.',
      })
    })
  })

  describe('DELETE /api/tasks/:id', () => {
    it('should return a 200 and delete the task', async () => {
      const createdTask = await TaskModel.create({
        ...taskPayload,
        id: uuidv4(),
      })

      const { statusCode, body } = await request(app)
        .delete(`/api/tasks/${createdTask.dataValues.id}`)
        .send(taskPayload)
      expect(statusCode).toBe(200)

      expect(body).toEqual({
        message: 'Task successfully deleted.',
      })
    })
  })
})
