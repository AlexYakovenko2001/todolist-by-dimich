import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './Todolist';
import {v1} from 'uuid';

export type FilterValuesType = 'all' | 'active' | 'completed';
type TasksType = { [key: string]: Array<TaskType>}

type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export function App() {
    const idTodolist1 = v1();
    const idTodolist2 = v1();

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: idTodolist1, title: 'What to learn', filter: 'all'},
        {id: idTodolist2, title: 'What to buy', filter: 'active'}
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [idTodolist1]: [
            {id: v1(), title: 'HTML&CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: true},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
            {id: v1(), title: 'RestAPI', isDone: false},
        ],
        [idTodolist2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Juice', isDone: false},
        ]
    })

    function removeTodolist(todolistId: string) {
        const newTodolists = todolists.filter(tl => tl.id !== todolistId )
        setTodolists(newTodolists)
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    function addTask(title: string, todolistId: string) {
        const newTasks = tasks[todolistId]
        const newTask = {id: v1(), title: title, isDone: false}
        tasks[todolistId] = [newTask, ...newTasks]
        setTasks({...tasks})
    }
    function removeTask(taskId: string, todolistId: string) {
       const newTasks = tasks[todolistId]
        tasks[todolistId] = newTasks.filter( t => t.id !== taskId )
        setTasks({...tasks})
    }
    function changeTaskIsDone(taskId: string, isDone: boolean, todolistId: string) {
        const newTasks = tasks[todolistId]
        const task = newTasks.find( t => t.id === taskId )
        if (task) {
            task.isDone = isDone
            setTasks({...tasks})
        }
    }
    function changeFilter(value: FilterValuesType, todolistId: string) {
        const newFilter = todolists.find(tl => tl.id === todolistId)
         if (newFilter) {
             newFilter.filter = value
             setTodolists([...todolists])
         }
    }
    return (
        <div className={'App'}>
            {todolists.map(tl => {
                let filtredTasks = tasks[tl.id]
                if (tl.filter === 'active') {
                    filtredTasks = filtredTasks.filter(t => !t.isDone)
                }
                if (tl.filter === 'completed') {
                    filtredTasks = filtredTasks.filter(t => t.isDone)
                }
                return (
                    <Todolist
                        key={tl.id}
                        id={tl.id}
                        title={tl.title}
                        tasks={filtredTasks}
                        removeTodolist={removeTodolist}
                        addTask={addTask}
                        removeTask={removeTask}
                        changeTaskIsDone={changeTaskIsDone}
                        changeFilter={changeFilter}
                        filter={tl.filter}
                    />
                )
            })}
        </div>
    )
}