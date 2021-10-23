import React from 'react'
import { Route, Redirect } from 'react-router-dom'

export const PrivateRoute = ({
    isAutenticated,
    component:Component,
    ...rest
}) => {
    return (
       <Route
        {...rest} 
        component=
            {(props)=>
             isAutenticated?
             (<Component {...props}/>)
             :
             (<Redirect to='/'/>) 
            }
            />
    )
}
