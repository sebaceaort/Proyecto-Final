import React, { useEffect, useState, useContext } from "react";
import { ShowArr } from "../../components/ShowArr";
import fiwareApi from "../../services/fiwareApi";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserContext } from "../../context/user-context";
//import AddEntityButton from "../components/AdminButtons/AddEntityButton";
import { UpdateContext } from "../../context/update-context";
import { Redirect } from "react-router-dom";

export const MunicipioEntitiesScreen = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const { setUpdate } = useContext(UpdateContext);

  useEffect(() => {
    const municipio = user.usMunicipio;
    if (user.usRole !== "admin") {
      async function getEntities() {
        const entities = await fiwareApi.getDataByQuery(
          "refMunicipio==" + municipio
        );
        setData(entities);
      }
      getEntities();
    } else {
      <Redirect to="" />;
    }
    setUpdate();
  }, [setUpdate, user.usRole, user.usMunicipio]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header>LISTADO DE MUNICIPIOS INTELIGENTES</Card.Header>
              <Card.Body>
                <ShowArr array={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
