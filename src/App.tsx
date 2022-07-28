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

    const removeTask = (id: number) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    let filtredTasks = tasks
    if (filter === 'active') {
        filtredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filtredTasks = tasks.filter(el => el.isDone)
    }


    const changeTasksList = (value: FilterType) => {
        setFilter(value)
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filtredTasks}
                removeTask={removeTask}
                changeTasksList={changeTasksList}
            />
        </div>
    );
}

export default App;
