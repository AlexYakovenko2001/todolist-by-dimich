import React from 'react';
import {FilterType} from './App';

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    changeTaskList : (value : FilterType) => void
}

export const Todolist = (props: TodolistPropsType) => {
    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input/>
                <button>+</button>
            </div>
            <ul>
                {props.tasks.map((t) => {
                    return (
                        <li key={t.id}>
                            <input type="checkbox" checked={t.isDone}/>
                            <span>{t.title}</span>
                            <button onClick={() => {props.removeTask(t.id)}}>x</button>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={()=>{props.changeTaskList('all')}}>All</button>
                <button onClick={()=>{props.changeTaskList('active')}}>Active</button>
                <button onClick={()=>{props.changeTaskList('completed')}}>Completed</button>
            </div>
        </div>
    )
}