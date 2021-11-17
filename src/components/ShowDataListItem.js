import React, { useState, useContext } from "react";
import { ShowDataListChildren } from "./ShowDataListChildren";
import { Accordion, Card } from "react-bootstrap";
import { UserContext } from "../context/user-context";
import AddEntityButton from "./AdminButtons/AddEntityButton";
import DeleteEntityButton from "./AdminButtons/DeleteEntityButton";
import EditEntityButton from "./AdminButtons/EditEntityButton";
import { Roles } from "../enums/Roles";

export const ShowDataListItem = ({ item }) => {
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
          <Card>
            <Accordion.Header onClick={handleClick}>
              {type} - <b>{name.value}</b>
            </Accordion.Header>
          </Card>
          <Accordion.Body>
            {user.usRole === Roles.admin && (
              <>
                <div style={{ display: "flex", justifyContent: "flex-start" }}>
                  <AddEntityButton item={item} />
                  <EditEntityButton item={item} />
                  <DeleteEntityButton item={item} />
                </div>
              </>
            )}
          </Accordion.Body>
        </Accordion.Item>
      </Accordion>
      {show && <ShowDataListChildren type={type} id={id} />}
    </div>
  );
};
