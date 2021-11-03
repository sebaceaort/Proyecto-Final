import React, { useState, useContext } from "react";
//import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { ShowChildrens } from "./ShowChildrens";
import AddGoalButton from "./nuevaMeta"
import IndicatorDataButton from "./nuevoIndicador";
import AddEntityButton from "./agregarEntidades";
import DeleteEntityButton from "./eliminarEntidades";
import UpdateEntityButton from "./updateEntities";
import {
  Accordion,
  Card,
  Button,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { UserContext } from "../context/user-context";

export const ShowChildrenItem = ({ item }) => {
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);
  var today = new Date();
  var date =
    today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate();

  const handleClick = () => {
    setShow(!show);
  };

  if (item.type !== "Indicator") {
    return (
      <div>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleClick}>
              {item.type} - <b>{item.name?.value}</b>
            </Accordion.Header>
            <Accordion.Body>
              {user.usRole === "admin" && (
                <>
                  <div
                    style={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <AddEntityButton item={item} />
                    <UpdateEntityButton item={item} />
                    <DeleteEntityButton item={item} />
                  </div>
                </>
              )}
            </Accordion.Body>
          </Accordion.Item>
        </Accordion>

        {show && <ShowChildrens type={item?.type} id={item?.id} />}
      </div>
    );
  } else {
    return (
      <div>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header onClick={handleClick}>
              <Container>
                <Row>
                  <Col>
                    {item.type} - {item.name.value}
                  </Col>
                  <Col lg="2"></Col>
                </Row>
              </Container>
            </Accordion.Header>
          </Accordion.Item>
        </Accordion>

        {show && (
          <Accordion defaultActiveKey="1">
            <Accordion.Item eventKey="1">
              <Accordion.Body>
                {user.usRole === "admin" && (
                  <>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "flex-start",
                      }}
                    >
                      <UpdateEntityButton item={item} />
                      <DeleteEntityButton item={item} />
                    </div>
                  </>
                )}
                <Card className="text-center">
                  <Card.Header className="mb-3">
                    <div>
                      Tipo: <b>{item.indicatorType.value}</b>
                    </div>
                    <hr />
                    <div>
                      Descripcion: <b>{item.description.value}</b>
                    </div>
                    <hr />
                    {user.usRole !== "admin" && (
                      <div>
                        <div>
                          <div>Hoy</div>
                          {date}
                          <ProgressBar
                            now={10}
                            label={`${10}%`}
                            variant="danger"
                          />
                        </div>
                        <hr />
                        <div>
                          <div>Meta</div>
                          {item.goalDate.value}
                          {console.log(item.data.value)}
                          <ProgressBar
                            now={item.goal.value}
                            label={`${item.goal.value}%`}
                            variant="success"
                          />
                        </div>
                      </div>
                    )}
                  </Card.Header>

                  <Container className="p-0">
                    <Row>
                      <Col>
                        <IndicatorDataButton item={item} />
                      </Col>
                      <Col>
                        <AddGoalButton item={item} />
                      </Col>
                    </Row>
                  </Container>
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    );
  }
};
