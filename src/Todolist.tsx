import React, {ChangeEvent} from 'react';
import {FilterValuesType} from './App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, title: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (todolistId: string, title: string) => void
    filter: FilterValuesType
}

export function Todolist(props: PropsType) {

    const addTask = (newTitle: string) => {
        props.addTask(newTitle, props.id)
    }

    const changeTodolistTitle = (title: string) => {
        props.changeTodolistTitle(props.id, title)
    }
    const removeTodolist = () => props.removeTodolist(props.id)

    const onAllClickHandler = () => props.changeFilter('all', props.id);
    const onActiveClickHandler = () => props.changeFilter('active', props.id);
    const onCompletedClickHandler = () => props.changeFilter('completed', props.id);

    return <div>
        <h3> <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
            <button onClick={removeTodolist}>x</button>
        </h3>
        <AddItemForm addItem={addTask}/>
        <ul>
            {
                props.tasks.map(t => {
                    const onClickHandler = () => props.removeTask(t.id, props.id)
                    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        let newIsDoneValue = e.currentTarget.checked;
                        props.changeTaskStatus(t.id, newIsDoneValue, props.id);
                    }
                    const changeTaskTitle = (title: string) => {
                        props.changeTaskTitle(props.id, t.id, title)
                    }
                    return <li key={t.id} className={t.isDone ? 'is-done' : ''}>
                        <input type="checkbox" onChange={onChangeHandler} checked={t.isDone}/>
                        <EditableSpan title={t.title} onChange={changeTaskTitle}/>
                        <button onClick={onClickHandler}>x</button>
                    </li>
                })
            }
        </ul>
        <div>
            <button className={props.filter === 'all' ? 'active-filter' : ''}
                    onClick={onAllClickHandler}>All
            </button>
            <button className={props.filter === 'active' ? 'active-filter' : ''}
                    onClick={onActiveClickHandler}>Active
            </button>
            <button className={props.filter === 'completed' ? 'active-filter' : ''}
                    onClick={onCompletedClickHandler}>Completed
            </button>
        </div>
    </div>
}

