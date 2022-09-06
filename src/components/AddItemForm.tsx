import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import {Button, TextField} from '@material-ui/core';

type AddItemFormPropsType = {
    callback: (title: string) => void
}
export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {

    const [title, setTitle] = useState('')
    const [error, setError] = useState<string | null>(null)

    const onInputChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }
    const addItemHandler = () => {
        if (title.trim() !== '') {
            props.callback(title)
            setTitle('')
        } else {
            setError('Title is required')
        }
    }
    const onKeyDownHandler = (e: KeyboardEvent<HTMLInputElement>) => {
        setError(null)
        if (e.key === 'Enter') {
            addItemHandler()
        }
    }
    return (
        <div>
            <TextField
                value={title}
                onChange={onInputChangeHandler}
                onKeyDown={onKeyDownHandler}
                error={!!error}
                size={'small'}
                id="outlined-basic"
                label="Add title"
                variant="outlined" />
            <Button variant="contained" size={'small'} color={'primary'} style={{maxWidth: '38px', maxHeight: '38px', minWidth: '38px', minHeight: '38px'}} onClick={addItemHandler}>+</Button>
        </div>
    )
}