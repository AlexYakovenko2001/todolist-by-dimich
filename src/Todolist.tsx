import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType} from './App';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTodolist: (todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    removeTask: (taskId: string, todolistId: string) => void
    changeTaskIsDone: (taskId: string, isDone: boolean, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    filter: FilterValuesType
}

export function Todolist(props: TodolistPropsType) {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<null | string>(null)

    function removeTodolistHandler() {
        props.removeTodolist(props.id)
    }
    function onInputChangeHandler(e: ChangeEvent<HTMLInputElement>) {
        setTitle(e.currentTarget.value)
    }
    function onPressEnterHandler(e: KeyboardEvent<HTMLInputElement>) {
        setError(null)
        if (e.key === 'Enter') {
            addTaskHandler()
        }
    }
    function addTaskHandler() {
        if (title.trim() !== '') {
            props.addTask(title, props.id)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }

    function onAllButtonClickHandler() {
        props.changeFilter('all', props.id)
    }
    function onActiveButtonClickHandler() {
        props.changeFilter('active', props.id)
    }
    function onCompletedButtonClickHandler() {
        props.changeFilter('completed', props.id)
    }
    return (
        <div>
            <h3>{props.title}<button onClick={removeTodolistHandler}>x</button></h3>
            <div>
                <input
                    value={title}
                    onChange={onInputChangeHandler}
                    onKeyDown={onPressEnterHandler}
                    className={'error'}
                />
                <button onClick={addTaskHandler}>+</button>
                {error ? <div className={'error-message'}>{error}</div> : ''}
            </div>
                <ul>
                    {props.tasks.map( t => {
                        function changeTaskStatusHandler(e: ChangeEvent<HTMLInputElement>) {
                            props.changeTaskIsDone(t.id, e.currentTarget.checked, props.id)
                        }
                        function removeTaskHandler() {
                            props.removeTask(t.id, props.id)
                        }
                        return(
                            <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                                <input type="checkbox" checked={t.isDone} onChange={changeTaskStatusHandler}/>
                                <span>{t.title}</span>
                                <button onClick={removeTaskHandler}>x</button>
                            </li>
                        )
                    } )}
                </ul>
                <div>
                    <button className={props.filter === 'all' ? 'active-filter' : ''} onClick={onAllButtonClickHandler}>All</button>
                    <button className={props.filter === 'active' ? 'active-filter' : ''} onClick={onActiveButtonClickHandler}>Active</button>
                    <button className={props.filter === 'completed' ? 'active-filter' : ''} onClick={onCompletedButtonClickHandler}>Completed</button>
                </div>
        </div>
    )
}