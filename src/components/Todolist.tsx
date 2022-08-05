import React, {ChangeEvent, useState} from 'react';
import {FilterType} from '../App';
import {Button} from './Button';


type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    getFiltredTasks: (filterValue: FilterType) => void
    addTask: (newTitle: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = ({title, tasks, removeTask, getFiltredTasks, addTask}) => {

    const [newTitle, setNewTitle] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onAddTaskButtonHandler = () => {
      addTask(newTitle)
        setNewTitle('')
    }

    return (
        <div>
            <h3>{title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInputHandler}/>
               <Button nickName={'+'} callBack={onAddTaskButtonHandler}/>
            </div>
            <ul>
                {tasks.map((t) => {
                    const removeTaskHandler = () => {
                        removeTask(t.id)
                    }
                    return (
                        <li key={t.id}>
                            <Button nickName={'X'} callBack={removeTaskHandler}/>
                            <input type={'checkbox'} checked={t.isDone}/>
                            <span>{t.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {getFiltredTasks('all')}}>All</button>
                <button onClick={() => {getFiltredTasks('active')}}>Active</button>
                <button onClick={() => {getFiltredTasks('completed')}}>Completed</button>
            </div>
        </div>
    )
}