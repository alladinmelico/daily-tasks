import { useEffect, useState } from 'react'
import TaskService from '../services/task.service'
import { ITask } from '../types'

export default function TaskForm(props: {
  selectedTask: ITask | undefined
  getAllTasks: any
}) {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const taskService = new TaskService()

  function onSubmit(e: any) {
    e.preventDefault()
    const target = e.target as typeof e.target & {
      title: { value: string }
      description: { value: string }
    }
    const task: ITask = {
      id: props.selectedTask?.id,
      title,
      description,
      isDone: false,
    }

    if (props.selectedTask) {
      taskService.update(task).then((response) => {
        if (response.data) {
          props.getAllTasks()
          setTitle('')
          setDescription('')
        }
      })
    } else {
      taskService.save(task).then((response) => {
        if (response.data) {
          props.getAllTasks()
          setTitle('')
          setDescription('')
        }
      })
    }
  }

  useEffect(() => {
    setTitle(props.selectedTask?.title || '')
    setDescription(props.selectedTask?.description || '')
  }, [props.selectedTask])

  return (
    <div>
      <form onSubmit={onSubmit} className="flex flex-col gap-5 my-10">
        <input
          type="text"
          placeholder="Title"
          className="input input-primary w-full"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          className="textarea textarea-primary"
          placeholder="Description"
          name="description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        ></textarea>
        <div className="flex justify-end">
          <button className="btn" type="submit">
            {props.selectedTask ? 'Edit' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  )
}
