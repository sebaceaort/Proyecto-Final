import React, { useEffect, useState, useContext } from "react";
import { ShowArr } from "../../components/ShowArr";
import fiwareApi from "../../services/fiwareApi";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { UserContext } from "../../context/user-context";
import { UpdateContext } from "../../context/update-context";
import { Redirect, useHistory } from "react-router-dom";
import { GoGraph } from "react-icons/go";

export const MunicipioEntitiesScreen = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const { setUpdate } = useContext(UpdateContext);
  const history = useHistory();

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
              <Button
                variant="warning"
                onClick={() => {
                  history.push("/show-graph");
                }}
              >
                <GoGraph /> Ver grafico
              </Button>
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
