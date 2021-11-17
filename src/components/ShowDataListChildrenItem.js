import React, { useState, useContext, useEffect } from "react";
import { ShowDataListChildren } from "./ShowDataListChildren";
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
import { TipoIndicador } from "../enums/TipoIndicador";
import { Entities } from "../enums/Entities";

export const ShowDataListChildrenItem = ({ item, setUpdate }) => {
  const [actualPercentage, setActualPercentage] = useState(0);
  const [show, setShow] = useState(false);
  const { user } = useContext(UserContext);

  useEffect(() => {
    setActualPercentage((item.data?.value * 100) / item.goal?.value);
  }, [item]);

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

  if (item.type !== Entities.indicador) {
    return (
      <div>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Card>
              <Accordion.Header
                style={{
                  border: "3px solid #E7F1FF",
                  borderRadius: "1%",
                  borderColor: "#E7F1FF",
                }}
                onClick={handleClick}
              >
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

        {show && <ShowDataListChildren type={item?.type} id={item?.id} />}
      </div>
    );
  } else {
    return (
      <div>
        <Accordion defaultActiveKey="1">
          <Accordion.Item eventKey="0">
            <Accordion.Header
              style={{
                border: "3px solid #E7F1FF",
                borderRadius: "1%",
                borderColor: "#E7F1FF",
              }}
              onClick={handleClick}
            >
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
                            label={`${
                              item.indicatorType.value === TipoIndicador.monto
                                ? "$"
                                : ""
                            }${item.data?.value} ${
                              item.indicatorType.value ===
                              TipoIndicador.porcentaje
                                ? "%"
                                : ""
                            }`}
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
                            label={`${
                              item.indicatorType.value === TipoIndicador.monto
                                ? "$"
                                : ""
                            }${item.goal?.value}${
                              item.indicatorType.value ===
                              TipoIndicador.porcentaje
                                ? "%"
                                : ""
                            }`}
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
                          <IndicatorDataButton item={item} />
                        </Col>
                        <Col>
                          <AddGoalButton item={item} />
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
