import React from "react";
import { ShowArrItem } from "./ShowArrItem";


export const ShowArr = ({ array = [] }) => {

  
  return (
    <>
      <button className="btn btn-success ms-2 ml-auto" >Agregar Municipio</button>
      {array.map((a, i) => {
        return <ShowArrItem item={a} key={i}/>      
      })}
    </>
  );
};
