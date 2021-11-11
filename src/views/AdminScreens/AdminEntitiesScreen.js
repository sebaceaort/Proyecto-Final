import React, { useEffect, useState, useContext } from "react";
import { ShowArr } from "../../components/ShowArr";
import fiwareApi from "../../services/fiwareApi";
import { Container, Row, Col, Card } from "react-bootstrap";
import { UserContext } from "../../context/user-context";
import AddEntityButton from "../../components/AdminButtons/AddEntityButton";
import { UpdateContext } from "../../context/update-context";

export const AdminEntitiesScreen = () => {
  const [data, setData] = useState([]);
  const { user } = useContext(UserContext);
  const { update } = useContext(UpdateContext);

  useEffect(() => {
    if (user.usRole === "admin") {
      async function getEntities() {
        const entities = await fiwareApi.getDataByType("Municipio");
        setData(entities);
      }
      getEntities();
    } else {
      async function getEntities() {
        const entities = await fiwareApi.getDataByType("Municipio");
        setData(entities);
      }
      getEntities();
    }
    return () => {};
  }, [update, user.usRole]);

  return (
    <>
      <Container>
        <Row>
          <Col>
            <Card className="text-center smartFontModal">
              <Card.Header>LISTADO DE MUNICIPIOS INTELIGENTES</Card.Header>
              <Card.Body>
                <div className="mb-2">
                  {user.usRole === "admin" && <AddEntityButton />}
                </div>
                <ShowArr array={data} />
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </Container>
    </>
  );
};
