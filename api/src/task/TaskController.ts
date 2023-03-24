import { Sequelize } from 'sequelize'
import { TaskModel } from './TaskModel'
import { Request, Response } from 'express'
import { v4 as uuidv4 } from 'uuid'

class TaskController {
  async index(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.findAll()

      return res.json({
        data: tasks,
        message: 'Tasks successfully retrieved.',
      })
    } catch (error) {
      return res.status(500).send('Failed to retrieve tasks')
    }
  }

  async show(req: Request, res: Response) {
    try {
      const { id } = req.params

      const data = await TaskModel.findOne({
        where: { id },
      })

      if (!data) {
        return res.status(404).send('Task not found')
      }

      return res.json({
        data: data.toJSON(),
        message: 'Task successfully retrieved.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }

  async save(req: Request, res: Response) {
    try {
      const data = await TaskModel.create({
        ...req.body,
        id: uuidv4(),
      })

      return res.json({
        data: data.toJSON(),
        message: 'Task successfully created.',
      })
    } catch (error) {
      return res.status(500).send('Failed to create')
    }
  }

  async update(req: Request, res: Response) {
    try {
      const data = await TaskModel.update(
        { ...req.body },
        { where: { id: req.params.id } }
      )

      return res.json({
        data: data,
        message: 'Task successfully updated.',
      })
    } catch (error) {
      return res.status(500).send('Failed to update')
    }
  }

  async updateStatus(req: Request, res: Response) {
    try {
      const data = await TaskModel.update(
        { isDone: Sequelize.literal('NOT isDone') },
        { where: { id: req.params.id } }
      )

      return res.json({ message: 'Task status successfully updated.' })
    } catch (error) {
      return res.status(500).send('Failed to update')
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const data = await TaskModel.destroy({ where: { id: req.params.id } })

      return res.json({
        data: data,
        message: 'Task successfully updated.',
      })
    } catch (error) {
      return res.status(500).send('Failed to update')
    }
  }
}

export default new TaskController()
