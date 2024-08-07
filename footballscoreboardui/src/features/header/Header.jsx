import React from 'react'
import {Outlet} from 'react-router-dom'

function Header() {
    return (
        <>
            <div className="border">
                <h1 className="text-danger p-2 m-2">Welcome to Football Live Score Board</h1>
            </div>
            <Outlet></Outlet>
        </>
    )
}

export default Header