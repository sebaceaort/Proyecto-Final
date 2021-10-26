import React, { useState } from "react";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { ShowChildrens } from "./ShowChildrens";

export const ShowArrItem = ({item}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const {type, name , id}  = item
  return (
    <div 
    className="conteiner mt-3 ms-4  bg-dark text-white w-75 "
    > 
     <span className="">{name.value} </span> 
        <button
         className="btn btn-primary ms-2" 
         onClick={handleClick}
         >
        {show ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
         </button>
      
      {show &&(<ShowChildrens  type={type} id={id}/>) }
    </div>
  );
};
