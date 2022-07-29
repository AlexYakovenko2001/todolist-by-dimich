import React from 'react';


type TasksType = {
    id: number
    title: string
    isDone: boolean
}

type TodolistPropsType = {
    title: string
    tasks: Array<TasksType>
    removeTask: (id: number) => void
    getNewTaskList: (value: string) => void
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
                {props.tasks.map((el, index) => {
                    return (
                        <li key={index}>
                            <button onClick={() => props.removeTask(el.id)}>X</button>
                            <input type="checkbox" checked={el.isDone}/>
                            <span>{el.title}</span>
                        </li>
                    )
                })}
            </ul>
            <div>
                <button onClick={() => {props.getNewTaskList('all')}}>All</button>
                <button onClick={() => {props.getNewTaskList('active')}}>Active</button>
                <button onClick={() => {props.getNewTaskList('completed')}}>Completed</button>
            </div>
        </div>
    );
};
