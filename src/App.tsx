import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';


function App() {

    const [tasks, setTask] = useState([{id: 1, title: 'HTML&&CSS', isDone: true},
        {id: 2, title: 'JS', isDone: true},
        {id: 3, title: 'ReactJS', isDone: false},
        {id: 4, title: 'Rest API', isDone: false},
        {id: 5, title: 'GraphQL', isDone: false}])

    const removeTask = (id: number) => {
        setTask(tasks.filter(el => el.id !== id))
    }

    const [filter, setFilter] = useState('all')

    let filtredTasks = tasks
    if (filter === 'active') {
        filtredTasks = tasks.filter(el => !el.isDone)
    }
    if (filter === 'completed') {
        filtredTasks = tasks.filter(el => el.isDone)
    }

    const getNewTaskList = (value: string) => {
        setFilter(value)
    }


    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filtredTasks}
                removeTask={removeTask}
                getNewTaskList={getNewTaskList}
            />
        </div>
    );
}

export default App;
