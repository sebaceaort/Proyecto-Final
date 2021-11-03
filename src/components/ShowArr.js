import React from "react";
import { ShowArrItem } from "./ShowArrItem";


export const ShowArr = ({ array = [] }) => {

  
  return (
    <>
      {array.map((a, i) => {
        return <ShowArrItem item={a} key={i}/>      
      })}
    </>
  );
};
