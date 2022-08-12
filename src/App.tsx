import React, {useState} from 'react';
import './App.css';
import {v1} from 'uuid';
import { Todolist } from './components/Todolist';

export type FilterValuesType = "all" | "active" | "completed";

function App() {

    const [tasks, setTasks] = useState([
        { id: v1(), title: "HTML&CSS", isDone: true },
        { id: v1(), title: "JS", isDone: true },
        { id: v1(), title: "ReactJS", isDone: false },
        { id: v1(), title: "Rest API", isDone: false },
        { id: v1(), title: "GraphQL", isDone: false },
    ]);
    const [filter, setFilter] = useState<FilterValuesType>('all')

    const removeTask = (taskId: string) => {
        setTasks(tasks.filter( t => t.id !== taskId ))
    }
    const changeTaskIsDone = (taskId: string, isDone: boolean) => {
        let task = tasks.find( t => t.id === taskId )
        if (task) {
            task.isDone = isDone
        }
        setTasks([...tasks])
    }
    const addTask = (newTitle: string) => {
        let newTask = {id: v1() , title: newTitle, isDone: false}
        setTasks([newTask, ...tasks])
    }

    let filtredTasks = tasks;
    if (filter === 'active') {
        filtredTasks = tasks.filter( t => !t.isDone )
    }
    if (filter === 'completed') {
        filtredTasks = tasks.filter( t => t.isDone )
    }
    const getFiltredTasks = (value: FilterValuesType) => {
        setFilter(value)
    }
    return (
        <div className={'App'}>
            <Todolist
            title={'What to learn'}
            tasks={filtredTasks}
            removeTask={removeTask}
            changeTaskIsDone={changeTaskIsDone}
            addTask={addTask}
            getFiltredTasks={getFiltredTasks}
            filter={filter}
        />
        </div>
    );
}

export default App;
