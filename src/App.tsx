import React, {useState} from 'react';
import './App.css';
import {Todolist} from './Todolist';
import { v1 } from 'uuid';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    let [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

const addTask = (newTitle: string) => {
    let task = { id: v1(), title: newTitle, isDone: false }
    let newTasks = [task, ...tasks]
    setTasks(newTasks)
}
const removeTask = (taskId: string) => {
    setTasks(tasks.filter( t => t.id !== taskId ))
}
const changeTaskStatus = (taskId: string, isDone: boolean) => {
    let task = tasks.find( t => t.id === taskId )
    if (task) {
        task.isDone = isDone
    }
    setTasks([...tasks])
}
const getFiltredTasks = (value: FilterValuesType) => {
    setFilter(value)
}


let filtredTasks = tasks;
    if (filter === 'active') {
        filtredTasks = tasks.filter( t => !t.isDone )
    }
    if (filter === 'completed') {
        filtredTasks = tasks.filter( t => t.isDone )
    }
    return (
        <div className="App">
            <Todolist
                title={'What to learn'}
                tasks={filtredTasks}
                addTask={addTask}
                removeTask={removeTask}
                changeTaskStatus={changeTaskStatus}
                getFiltredTasks={getFiltredTasks}
                filter={filter}
            />
        </div>
    );
}

export default App;
