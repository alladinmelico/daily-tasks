import { useEffect, useState } from 'react'
import TaskItem from './components/TaskItem'
import TaskForm from './components/TaskForm'
import TaskService from './services/task.service'
import { ITask } from './types'

function App() {
  const [tasks, setTasks] = useState<Array<ITask>>([])
  const [selectedTask, setSelectedTask] = useState<ITask>()
  const taskService = new TaskService()

  function addTask(task: ITask) {
    setTasks((prev) => [...prev, task])
  }

  function editTask(task: ITask) {}

  function getAllTasks() {
    setTasks([])
    setSelectedTask(undefined)
    taskService.index().then((response) => {
      setTasks(
        response.data.map(
          (task: any): ITask => ({
            id: task.id,
            title: task.title,
            description: task.description,
            isDone: task.isDone,
          })
        )
      )
    })
  }

  useEffect(() => {
    getAllTasks()
  }, [])

  return (
    <div className="container mx-auto h-100 flex flex-col justify-center max-w-2xl">
      <h1 className="text-3xl text-center mt-8">Daily Tasks</h1>
      <TaskForm getAllTasks={getAllTasks} selectedTask={selectedTask} />
      <div className="mt-10 flex flex-col gap-10">
        {tasks.map((task) => (
          <TaskItem
            key={task.id}
            task={task}
            setSelectedTask={setSelectedTask}
            getAllTasks={getAllTasks}
          />
        ))}
      </div>
    </div>
  )
}

export default App
