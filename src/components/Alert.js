import React from 'react'

function Alert(props) {
    return (
        <div style = {{height:'50px'}}>
            {props.text && <div className= {`alert alert-${props.text.type} alert-dismissible fade show`} role="alert">
                <strong>{props.text.type}</strong> : {props.text.msg}
            </div>}
        </div>
    )
}

export default Alert
