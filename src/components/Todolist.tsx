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
    addTask: (title: string) => void
    removeTask: (id: string) => void
    getFiltredTasks: (value: FilterType) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {

    const [newTitle, setNewTitle] = useState('')

    const onChangeInputHandler = (e:ChangeEvent<HTMLInputElement>) => {
        setNewTitle(e.currentTarget.value)
    }
    const addTaskButtonHandler = () => {
        props.addTask(newTitle)
        setNewTitle('')
    }
    const removeTaskHandler = (id: string) => {
        props.removeTask(id)
    }
    const filtredTasksHandler = (value: FilterType) => {
        props.getFiltredTasks(value)
    }

    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input value={newTitle} onChange={onChangeInputHandler}/>
                <Button nickName={'+'} callBack={addTaskButtonHandler} />
            </div>
            <ul>
                {props.tasks.map( (t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <Button nickName={'x'} callBack={ () => {removeTaskHandler(t.id)} } />
                        </li>
                    )
                })}
            </ul>
            <div>
                <Button nickName={'All'} callBack={ () => filtredTasksHandler('all') } />
                <Button nickName={'Active'} callBack={() => filtredTasksHandler('active') } />
                <Button nickName={'Completed'} callBack={() => filtredTasksHandler('completed') } />
            </div>
        </div>
    );
};
