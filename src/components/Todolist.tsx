import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button} from './Button';
import {FilterValuesType} from '../App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeTaskIsDone: (taskId: string, isDone: boolean) => void
    addTask: (newTitle: string) => void
    getFiltredTasks: (value: FilterValuesType) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    const [newTitle, setNewTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addTask()
        }
    }
    const addTask = () => {
        if (newTitle.trim() !== '') {
            props.addTask(newTitle)
            setNewTitle('')
        } else {
            setError('title is required')
        }
    }
    const getFiltredTasks = (value: FilterValuesType) => {
        props.getFiltredTasks(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    value={newTitle}
                    onChange={onChangeHandler}
                    onKeyDown={onKeyDownHandler}
                    className={error ? 'error' : ''}
                />
                <Button nickName={'+'} callBack={addTask}/>
                {error && <div className={'error-message'}>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(t => {
                    const onRemoveButtonHandler = () => props.removeTask(t.id)
                    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskIsDone(t.id, e.currentTarget.checked)
                    }
                    return (
                        <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                            <input
                                type="checkbox"
                                onChange={onInputChangeHandler}
                                checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button nickName={'x'} callBack={onRemoveButtonHandler}/>
                        </li>
                    )
                })}

            </ul>
            <div>
              <button
                  className={props.filter === 'all' ? 'active-filter' : ''}
                  onClick={ () => getFiltredTasks('all') }>
                  All
              </button>
              <button
                  className={props.filter === 'active' ? 'active-filter' : ''}
                  onClick={ () => getFiltredTasks('active') }>
                  Active
              </button>
              <button
                  className={props.filter === 'completed' ? 'active-filter' : ''}
                  onClick={ () => getFiltredTasks('completed') }>
                  Completed
              </button>
            </div>
        </div>
    )
}