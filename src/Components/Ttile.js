import React from 'react'

function Ttile({ name, title}) {
    return (
        <div className="row">
            <div className="col-10 mx-auto my-2 text-center text-title" style={{fontSize: '2rem'}}>
                <h1 className="text-capitalize font-weight-bold"> 
                {name} <strong className="text-blue">{title}</strong>
                </h1>
            </div>
        </div>
    )
}

export default Ttile
