import React, { useEffect, useState, useContext } from "react";
import { ShowArr } from "../components/ShowArr";
import fiwareApi from "../services/fiwareApi";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { UserContext } from "../context/user-context";

export const PruebasScreen = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  useEffect(() => {
    async function getEntities() {
      const entities = await fiwareApi.getDataByType("Municipio");
      setData(entities);
    }
    getEntities();
  }, []);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="text-center">
              <Card.Header>LISTADO DE MUNICIPIOS INTELIGENTES</Card.Header>
              <Card.Body>
                {user.usRole === "admin" && (
                  <Button style={{ marginBottom: "15px" }} variant="success">
                    Agregar Municipio
                  </Button>
                )}
                <ShowArr array={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
