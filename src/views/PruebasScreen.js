import React, { useEffect, useState, useContext } from "react";
import { ShowArr } from "../components/ShowArr";
import fiwareApi from "../services/fiwareApi";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserContext } from "../context/user-context";
import AddEntityButton from "../components/agregarEntidades";

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
                 <AddEntityButton/>
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
