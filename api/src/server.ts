import express, { Request } from 'express'
import cors from 'cors'
import database from './config/database.config'
import TaskRoute from './task/TaskRoute'

database.sync()

const PORT = process.env.PORT || 9000
export const app = express()

app.use(express.json())
app.use(cors<Request>())

app.use('/api', TaskRoute)

export const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`)
})
