import { DataTypes, Model } from 'sequelize'
import database from '../config/database.config'

export interface ITask {
  id: string
  title: string
  description: string
  isDone: boolean
}

export class TaskModel extends Model<ITask> {}

TaskModel.init(
  {
    id: {
      type: DataTypes.UUIDV4,
      primaryKey: true,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isDone: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize: database,
    tableName: 'tasks',
    modelName: 'Task',
  }
)
