import React from 'react';
type ButtonPropsType = {
    nickName: string
    callBack: () => void
}
export const Button: React.FC<ButtonPropsType> = (props) => {
    const onClickButtonHandler = () => {
        props.callBack()
    }
    return (
        <button onClick={onClickButtonHandler}>{props.nickName}</button>
    );
};
