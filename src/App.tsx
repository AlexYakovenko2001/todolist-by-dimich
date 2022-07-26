import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';

export type FilterType = 'all' | 'active' | 'completed'

function App() {

    const [tasks, setTasks] = useState([{id: 1, title: 'HTML&&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}])

    const [filter, setFilter] = useState<FilterType>('all')

    const removeTask = (id:number) => {
        let newTasksList = tasks.filter(t => t.id !== id)
        setTasks(newTasksList)
    }

    let filtredTasks = tasks
    if (filter === 'active') {
        filtredTasks = tasks.filter(t => t.isDone !== true)
    }
    if (filter === 'completed') {
        filtredTasks = tasks.filter(t => t.isDone !== false)
    }

    const changeTaskList = (value: FilterType) => {
        setFilter(value)
    }

    return (
        <div className="App">
            <Todolist
                tasks={filtredTasks}
                title={'What to learn'}
                removeTask={removeTask}
                changeTaskList={changeTaskList}/>
        </div>
    );
}

export default App;
