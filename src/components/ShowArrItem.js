import React, { useState, useContext } from "react";
import { ShowChildrens } from "./ShowChildrens";
import { Accordion, Button } from "react-bootstrap";
import { UserContext } from "../context/user-context";
import AddEntityButton from "./agregarEntidades";
import DeleteEntityButton from "./eliminarEntidades";

export const ShowArrItem = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClick = () => {
    setShow(!show);
  };
  const { user } = useContext(UserContext);
  const { type, name, id } = item;
  return (
    <div>
      <Accordion defaultActiveKey="1">
        <Accordion.Item eventKey="0">
          <Accordion.Header onClick={handleClick}>
            {type} - <b>{name.value}</b>
          </Accordion.Header>
          <Accordion.Body>
            {" "}
            {user.usRole === "admin" && (
              <>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <AddEntityButton item={item} />
                  <DeleteEntityButton item={item} />
                </div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {show && <ShowChildrens type={type} id={id} />}
    </div>
  );
};
