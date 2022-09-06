import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from './components/Todolist';
import {v1} from 'uuid';
import {AddItemForm} from './components/AddItemForm';
import {AppBar, Box, Button, Container, Grid, IconButton, Paper, Toolbar, Typography} from '@material-ui/core';
import {Menu} from '@material-ui/icons';

export type FilterValuesType = 'all' | 'active' | 'complete'
type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}
type TasksType = {
    [key: string]: Array<TaskType>
}

function App() {

    const idForTodolist1 = v1()
    const idForTodolist2 = v1()

    const [todolists, setTodolists] = useState<Array<TodolistType>>([
        {id: idForTodolist1, title: 'What to learn', filter: 'all'},
        {id: idForTodolist2, title: 'What to buy', filter: 'all'},
    ])
    const [tasks, setTasks] = useState<TasksType>({
        [idForTodolist1]: [
            {id: v1(), title: 'HTML', isDone: true},
            {id: v1(), title: 'CSS', isDone: true},
            {id: v1(), title: 'JS', isDone: false},
            {id: v1(), title: 'React', isDone: false},
            {id: v1(), title: 'Redux', isDone: false},
        ],
        [idForTodolist2]: [
            {id: v1(), title: 'Bread', isDone: true},
            {id: v1(), title: 'Carrot', isDone: false},
            {id: v1(), title: 'Milk', isDone: false},
            {id: v1(), title: 'Juice', isDone: true},
        ]
    })

    const addTodolist = (newTitle: string) => {
        const idForTodolist = v1()
        const newTodolist: TodolistType = {id: idForTodolist, title: newTitle, filter: 'all'}
        setTodolists([newTodolist, ...todolists])
        setTasks({...tasks, [idForTodolist]: []})
    }
    const changeTodolistTitle = (todolistId: string, newTitle: string) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, title: newTitle} : tl))
    }
    const deleteTodolist = (todolistId: string) => {
        setTodolists(todolists.filter(tl => tl.id !== todolistId))
        delete tasks[todolistId]
        setTasks({...tasks})
    }
    const changeFilter = (todolistId: string, filterValue: FilterValuesType) => {
        setTodolists(todolists.map(tl => tl.id === todolistId ? {...tl, filter: filterValue} : tl))
    }

    const addTask = (todolistId: string, newTitle: string) => {
      const newTask = {id: v1(), title: newTitle, isDone: false};
      setTasks({...tasks, [todolistId]: [newTask, ...tasks[todolistId]]})
    }
    const changeTaskTitle = (todolistId: string, taskId: string, newTitle: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, title: newTitle} : t)})
    }
    const changeTaskIsDone = (todolistId: string, taskId: string, isDone: boolean) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].map(t => t.id === taskId ? {...t, isDone} : t)})
    }
    const deleteTask = (todolistId: string, taskId: string) => {
        setTasks({...tasks, [todolistId]: tasks[todolistId].filter(t => t.id !== taskId)})
    }
    return (
        <div className="App">
            <ButtonAppBar/>
            <Container fixed>
                <Grid container style={{padding: '20px'}}>
                    <AddItemForm callback={addTodolist}/>
                </Grid>
                <Grid container spacing={3}>
                    {todolists.map(tl => {
                        let filtredTasks = tasks[tl.id]
                        if (tl.filter === 'active') {
                            filtredTasks = filtredTasks.filter(t => !t.isDone)
                        }
                        if (tl.filter === 'complete') {
                            filtredTasks = filtredTasks.filter(t => t.isDone)
                        }
                        return ( <Grid item>
                                <Paper elevation={3} style={{padding: '10px'}}>
                                    <Todolist
                                        key={tl.id}
                                        todolistId={tl.id}
                                        todolistTitle={tl.title}
                                        changeTodolistTitle={changeTodolistTitle}
                                        deleteTodolist={deleteTodolist}
                                        filter={tl.filter}
                                        changeFilter={changeFilter}
                                        tasks={filtredTasks}
                                        addTask={addTask}
                                        changeTaskTitle={changeTaskTitle}
                                        changeTaskIsDone={changeTaskIsDone}
                                        deleteTask={deleteTask}
                                    />
                                </Paper>
                        </Grid>
                        )
                    })}
                </Grid>
            </Container>
        </div>
    );
}


 function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <Menu />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}

export default App;
