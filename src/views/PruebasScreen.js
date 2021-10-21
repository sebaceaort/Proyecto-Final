import React from 'react'
import { ShowArr } from '../components/ShowArr'
import { data } from '../DataAux/data'

export const PruebasScreen = () => {
    const datos = data
    
    return (
        <>
        <h1>seccion de prueba</h1>
        <div className=" d-flex flex-column conteiner-fluid bg-dark ">
            <ShowArr array={datos}/>
        </div>
        </>
    )
}
