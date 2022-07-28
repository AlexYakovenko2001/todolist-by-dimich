import React from 'react';
import {FilterType} from './App';

type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsTypes = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id:number) => void
    changeTasksList: (value: FilterType)=>void
}

export const Todolist = (props: TodolistPropsTypes) => {
    return (
            <div>
                <h3>{props.title}</h3>
                <div>
                    <input/>
                    <button>+</button>
                </div>
                <ul>
                    {props.tasks.map((t)=>{
                        return (
                            <li key={t.id}>
                                <input type="checkbox" checked={t.isDone}/>
                                <span>{t.title}</span>
                                <button onClick={()=>{props.removeTask(t.id)}}>X</button>
                            </li>
                        )
                    })}
                </ul>
                <div>
                    <button onClick={()=>{props.changeTasksList('all')}}>All</button>
                    <button onClick={()=>{props.changeTasksList('active')}}>Active</button>
                    <button onClick={()=>{props.changeTasksList('completed')}}>Completed</button>
                </div>
            </div>
    )
}