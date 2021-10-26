import React, { useState } from "react";
import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { ShowChildrens } from "./ShowChildrens";
export const ShowChildrenItem = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };

  if (item.type !== "Indicator") {
    return (
      <div className="conteiner mt-3 ms-4  bg-dark text-white ">
        {item.name?.value}

        <button className="btn btn-primary ms-2" onClick={handleClick}>
          {show ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        </button>
        
        {show && <ShowChildrens type={item?.type} id={item?.id} />}
      
      </div>
    );
  } else {
    return (
      <div className="conteiner mt-3 ms-4  bg-dark text-white ">
        <button className="btn btn-primary ms-2 md-12" onClick={handleClick}>
          {show ? <BsFillCaretDownFill /> : <BsFillCaretRightFill />}
        </button>
        <span className="container">{item.name.value}</span>

        {show && (
          <p className="conteiner pi-5 mt-3 ms-4 ">{item.description.value}</p>
        )}
      </div>
    );
  }
};
