import React from "react";

const Button = (props) => {
    return(
        <button onClick={props.command}>{props.value}</button> 
    );
}

export default Button;