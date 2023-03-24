import axios from 'axios'
import { ITask } from '../types'

const URL = 'http://localhost:9000/api/tasks'

export default class TaskService {
  public async index(): Promise<any> {
    const { data } = await axios.get(URL)
    return await data
  }

  public async show(task: ITask): Promise<any> {
    const { data } = await axios.get(`${URL}/${task.id}`)
    return await data
  }

  public async save(task: ITask): Promise<any> {
    const { data } = await axios.post(URL, task)
    return await data
  }

  public async update(task: ITask): Promise<any> {
    const { data } = await axios.put(`${URL}/${task.id}`, task)
    return await data
  }

  public async markAsDone(task: ITask): Promise<any> {
    const { data } = await axios.patch(`${URL}/status/${task.id}`)
    return await data
  }

  public async delete(task: ITask): Promise<any> {
    const { data } = await axios.delete(`${URL}/${task.id}`)
    return await data
  }
}
