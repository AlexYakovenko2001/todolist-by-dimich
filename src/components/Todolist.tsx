import React, {ChangeEvent} from 'react';
import {FilterValuesType} from '../App';
import {AddItemForm} from './AddItemForm';
import {EditableSpan} from './EditableSpan';
import {Button, Checkbox, IconButton} from '@material-ui/core';
import {Delete} from '@material-ui/icons';

export type TaskType = {
    id: string
    title: string
    isDone: boolean
}
type TodolistPropsType = {
    todolistId: string
    todolistTitle: string
    changeTodolistTitle: (todolistId: string, title: string) => void
    deleteTodolist: (todolistId: string) => void
    filter: FilterValuesType
    changeFilter: (todolistId: string, filterValue: FilterValuesType) => void
    tasks: Array<TaskType>
    addTask: (todolistId: string, newTitle: string) => void
    changeTaskTitle: (todolistId: string, taskId: string, newTitle: string) => void
    changeTaskIsDone: (todolistId: string, taskId: string, isDone: boolean) => void
    deleteTask: (todolistId: string, taskId: string) => void
}

export const Todolist: React.FC<TodolistPropsType> = (props) => {
    const {todolistId, todolistTitle, filter, tasks, ...rest} = props;

    const changeTodolistTitle = (title: string) => {
        rest.changeTodolistTitle(todolistId, title)
    }
    const deleteTodolistHandler = () => {
        rest.deleteTodolist(todolistId)
    }

    const addTaskHandler = (title: string) => {
        rest.addTask(todolistId, title)
    }

    const onAllButtonClickHandler = () => rest.changeFilter(todolistId, 'all')
    const onActiveButtonClickHandler = () => rest.changeFilter(todolistId, 'active')
    const onCompletedButtonClickHandler = () => rest.changeFilter(todolistId, 'complete')

    return (
        <div>
            <h3><EditableSpan title={todolistTitle} callback={changeTodolistTitle}/>
                <IconButton aria-label="delete" onClick={deleteTodolistHandler}>
                    <Delete />
                </IconButton>
            </h3>
          <AddItemForm callback={addTaskHandler}/>
            <ul>
                {tasks.map(t => {
                    const changeTaskTitleHandler = (title: string) => {
                        rest.changeTaskTitle(todolistId, t.id, title)
                    }
                    const changeTaskIsDoneHandler = (e: ChangeEvent<HTMLInputElement>) => {
                        rest.changeTaskIsDone(todolistId, t.id, e.currentTarget.checked)
                    }
                    const deleteTaskHandler = () => {
                        rest.deleteTask(todolistId, t.id)
                    }
                    return (
                        <li key={t.id}>
                            <Checkbox onChange={changeTaskIsDoneHandler} checked={t.isDone} color={'primary'}/>
                            <EditableSpan title={t.title} callback={changeTaskTitleHandler}/>
                            <IconButton aria-label="delete" onClick={deleteTaskHandler}>
                                <Delete />
                            </IconButton>
                        </li>
                    )
                })}

                <div>
                    <Button variant={filter === 'all' ? "outlined" : "contained"} color="primary" onClick={onAllButtonClickHandler} size={'small'}>All</Button>
                    <Button variant={filter === 'active' ? "outlined" : "contained"} color="default"  onClick={onActiveButtonClickHandler} size={'small'}>Active</Button>
                    <Button variant={filter === 'complete' ? "outlined" : "contained"} color="secondary" onClick={onCompletedButtonClickHandler} size={'small'}>Completed</Button>
                </div>
            </ul>
        </div>
    )
}