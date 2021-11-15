import React, { useState, useContext, useEffect } from "react";
//import { BsFillCaretRightFill, BsFillCaretDownFill } from "react-icons/bs";
import { ShowChildrens } from "./ShowChildrens";
import AddGoalButton from "./MunicipioButtons/UpdateGoal";
import IndicatorDataButton from "./MunicipioButtons/UpdateIndicator";
import AddEntityButton from "./AdminButtons/AddEntityButton";
import DeleteEntityButton from "./AdminButtons/DeleteEntityButton";
import UpdateEntityButton from "./AdminButtons/EditEntityButton";
import {
  Accordion,
  Card,
  Container,
  Row,
  Col,
  ProgressBar,
} from "react-bootstrap";
import { UserContext } from "../context/user-context";
import { Roles } from "../enums/Roles";

export const ShowChildrenItem = ({ item, setUpdate }) => {


  
  const [actualPercentage, setactualPercentage] = useState(0);
  useEffect(() => {
    setactualPercentage((item.data?.value * 100) / item.goal?.value);
  }, [item]);
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);

  const formatDate = (date) => {
    let dia = date.slice(8, 10);
    let mes = date.slice(5, 7);
    let anio = date.slice(0, 4);

    return dia + "-" + mes + "-" + anio;
  };

  const variantSelector = (percentage) => {
    if (percentage < 35) {
      return "danger";
    } else if (percentage < 75) {
      return "warning";
    } else if (percentage < 99.9) {
      return "success";
    } else return "info";
  };
  const handleClick = () => {
    setShow(!show);
  };
  //style={{ border: "2px solid", borderRadius: "1%", borderColor: "#0C63E4" }} -> Line 53
  if (item.type !== "Indicator") {
    return (
      <div>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Card>
              <Accordion.Header style={{ border: "3px solid #E7F1FF", borderRadius: "1%", borderColor: "#E7F1FF" }} onClick={handleClick}>
                {item.type} - <b>{item.name?.value}</b>
              </Accordion.Header>
            </Card>
            <Accordion.Body>
              {user.usRole === Roles.admin && (
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
            <Accordion.Header style={{ border: "3px solid #E7F1FF", borderRadius: "1%", borderColor: "#E7F1FF" }} onClick={handleClick}>
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
                {user.usRole === Roles.admin && (
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
                <Card className="text-center mt-2 ">
                  <Card.Header className="mb-3">
                    <div>
                      Tipo: <b>{item.indicatorType.value}</b>
                    </div>
                    <hr />
                    <div>
                      Descripcion: <b>{item.description.value}</b>
                    </div>
                    <hr />
                    {user.usRole === Roles.municipio && (
                      <div>
                        <div>
                          <div>Indicador Actual</div>

                          {formatDate(item.indicatorDate?.value)}
                          <hr />
                          <ProgressBar
                            animated
                            now={actualPercentage}
                            label={`${item.data?.value}%`}
                            striped
                            variant={variantSelector(actualPercentage)}
                          />
                        </div>
                        <hr />
                        <div>
                          <div>Meta</div>

                          {formatDate(item.goalDate?.value)}
                          <hr />
                          <ProgressBar
                            animated
                            now={100}
                            label={`${item.goal?.value}%`}
                            striped
                            variant="success"
                          />
                        </div>
                      </div>
                    )}
                  </Card.Header>
                  {user.usRole === Roles.municipio && (
                    <Container className="p-0">
                      <Row>
                        <Col>
                          <IndicatorDataButton
                            item={item}
                            setUpdate={setUpdate}
                          />
                        </Col>
                        <Col>
                          <AddGoalButton item={item} setUpdate={setUpdate} />
                        </Col>
                      </Row>
                    </Container>
                  )}
                </Card>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>
        )}
      </div>
    );
  }
};
