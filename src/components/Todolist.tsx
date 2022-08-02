import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {FilterType} from '../App';
import {Button} from './Button';

type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void
    getFiltredTasks: (buttonName: FilterType) => void
    addTask: (newTitle: string) => void
}

export function Todolist(props: PropsType) {
    const [title, setTitle] = useState('')

    const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
        setTitle(event.currentTarget.value)
    }
    const onPressEnterHandler = (event: KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
            props.addTask(title)
            setTitle('')
        }
    }
    const onClickButtonHandler = () => {
        props.addTask(title)
        setTitle('')
    }
    const onFiltredButtonHandler = (filtredButtonName: FilterType) => {
        props.getFiltredTasks(filtredButtonName)
    }
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={title} onChange={onChangeInputHandler} onKeyDown={onPressEnterHandler}/>
                <Button name={'+'} callBack={onClickButtonHandler}/>
            </div>
            <ul>
                {props.tasks.map((t) => {

                    const removeTask = () => {
                        props.removeTask(t.id)
                    }
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button name={'X'} callBack={removeTask}/>
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button name={'All'} callBack={()=>onFiltredButtonHandler('all')}/>
                <Button name={'Active'} callBack={()=>onFiltredButtonHandler('active')}/>
                <Button name={'Completed'} callBack={()=>onFiltredButtonHandler('completed')}/>
            </div>
        </div>
    )
}

