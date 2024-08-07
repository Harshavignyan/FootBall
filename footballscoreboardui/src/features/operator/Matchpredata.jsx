import React from 'react'
import {Link} from 'react-router-dom'

function Matchpredata(){
    return(
        <div className="container">
            <h1 className="display-3 m-2 p-2">Match Pre Data:</h1>
            <Link to="/operator" className="display-6 m-2 p-2 link-body-emphasis link-underline-danger link-offset-2 link-underline-opacity-25 link-underline-opacity-75-hover">LiveMatch</Link>
        </div>
    )
}

export default Matchpredata