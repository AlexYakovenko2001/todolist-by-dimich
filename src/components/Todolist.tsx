import React, {ChangeEvent,KeyboardEvent, useState} from 'react';
import {FilterValuesType} from '../App';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string) => void
    changeFilter: (value: FilterValuesType) => void
    addTask: (title: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const onChangeInputHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const onKeyUpInputHandler = (e:KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }


    const onClickButtonPlusHandler = () => {
        props.addTask(title)
        setTitle('')
    }

    const onAllButtonClickHandler = () => props.changeFilter('all')
    const onActiveButtonClickHandler = () => props.changeFilter('active')
    const onCompletedButtonClickHandler = () => props.changeFilter('completed')
    return <div>
        <h3>{props.title}</h3>
        <div>
            <input value={title} onChange={onChangeInputHandler} onKeyUp={onKeyUpInputHandler}/>
            <button onClick={onClickButtonPlusHandler}>+</button>
        </div>
        <ul>
            {props.tasks.map((t) => {
                const removeTask = () => {
                    props.removeTask(t.id)
                }
                return (
                    <li>
                        <input type={'checkbox'} checked={t.isDone}/>
                        <span>{t.title}</span>
                        <button onClick={removeTask}>X</button>
                    </li>
                )
            })}
        </ul>
        <div>
            <button onClick={onAllButtonClickHandler}>All</button>
            <button onClick={onActiveButtonClickHandler}>Active</button>
            <button onClick={onCompletedButtonClickHandler}>Completed</button>
        </div>
    </div>
}
