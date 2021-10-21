import React, { useState } from "react";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { ShowArr } from "./ShowArr";

export const ShowArrItem = ({item}) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  return (
    <div 
    className="conteiner mt-3 ms-4  bg-dark text-white "
    > 
        {item.name.value}
        <button
         className="btn btn-primary ms-2" 
         onClick={handleClick}
         >
        {show ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
         </button>

      {show &&(<ShowArr array={item?.value}/>) }
    </div>
  );
};
