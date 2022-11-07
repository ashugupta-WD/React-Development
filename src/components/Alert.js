import React from 'react'

export default function Alert(props) {
    return (
        <>
            <div className="alert alert-primary" role="alert" style={{margin: '0'}}>{props.msg}</div>
        </>
    )
}
