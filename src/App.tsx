import React, {useState} from 'react';
import './App.css';
import {Todolist} from './components/Todolist';
import {v1} from 'uuid';

export type FilterType = 'all' | 'active' | 'completed'

function App() {
    const [tasks, setTasks] = useState([
        {id: v1(), title: 'HTML&&CSS', isDone: true},
        {id: v1(), title: 'JS', isDone: true},
        {id: v1(), title: 'ReactJS', isDone: false},
        {id: v1(), title: 'Rest API', isDone: false},
        {id: v1(), title: 'GraphQL', isDone: false}])

    const removeTask = (id: string) => {
        setTasks(tasks.filter(t => t.id !== id))
    }

    const [filter, setFilter] = useState<FilterType>('all')

    let filtredTasks = tasks;
    if (filter==='active') {
        filtredTasks = tasks.filter(t=>!t.isDone)
    }
    if (filter==='completed') {
        filtredTasks = tasks.filter(t=>t.isDone)
    }

    const getFiltredTasks = (buttonName: FilterType) => {
      setFilter(buttonName)
    }

    const addTask = (newTitle: string) => {
        let newTask = {id: v1(), title: newTitle, isDone: false}
        let newTasks = [newTask, ...tasks]
        setTasks(newTasks)
    }

    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filtredTasks}
                removeTask={removeTask}
                getFiltredTasks={getFiltredTasks}
                addTask={addTask}
            />
        </div>
    );
}

export default App;