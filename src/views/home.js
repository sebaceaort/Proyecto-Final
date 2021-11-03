// import { useState, useEffect, useContext } from "react";
// import { UserContext } from "../context/user-context";
// import fiwareApi from "../services/fiwareApi";
// import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import { Container, Col, Row, Image } from "react-bootstrap";

export default function Home() {
  // const { user } = useContext(UserContext);
  //const [entities, setEntities] = useState([]);

  // useEffect(() => {
  //     async function getEntities() {
  //       if(user){
  //         const entities = await fiwareApi.getEntities();
  //         setEntities((oldEntities) => [...oldEntities, entities]);

  //       }
  //     }
  //     getEntities()
  // }, [user]);

  return (
    <>
      <Container>
        <Row>
          <Col className="text-center smartFont">Ciudades Inteligentes</Col>
        </Row>
        <Row>
          <Col className="text-center">
            <Image
              src="https://www.fiware.com.ar/wp-content/uploads/2019/06/LogoCiudades.png"
              alt="Ciudades del futuro"
              fluid
            />
          </Col>
        </Row>
        <Row>
          <Col className="d-flex flex-column">
            <h2 className="flex-row align-self-center fs-1 p-2 m-3">
              {" "}
              Mision{" "}
            </h2>
            <p className="flex-row m-2">
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32. The standard chunk of Lorem Ipsum
              used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham.
            </p>
          </Col>
          <Col className="d-flex flex-column">
            <h2 className="flex-row align-self-center fs-1 p-2 m-3">
              {" "}
              Vision{" "}
            </h2>
            <p className="flex-row m-2">
              Where does it come from? Contrary to popular belief, Lorem Ipsum
              is not simply random text. It has roots in a piece of classical
              Latin literature from 45 BC, making it over 2000 years old.
              Richard McClintock, a Latin professor at Hampden-Sydney College in
              Virginia, looked up one of the more obscure Latin words,
              consectetur, from a Lorem Ipsum passage, and going through the
              cites of the word in classical literature, discovered the
              undoubtable source. Lorem Ipsum comes from sections 1.10.32 and
              1.10.33 of "de Finibus Bonorum et Malorum" (The Extremes of Good
              and Evil) by Cicero, written in 45 BC. This book is a treatise on
              the theory of ethics, very popular during the Renaissance. The
              first line of Lorem Ipsum, "Lorem ipsum dolor sit amet..", comes
              from a line in section 1.10.32. The standard chunk of Lorem Ipsum
              used since the 1500s is reproduced below for those interested.
              Sections 1.10.32 and 1.10.33 from "de Finibus Bonorum et Malorum"
              by Cicero are also reproduced in their exact original form,
              accompanied by English versions from the 1914 translation by H.
              Rackham.
            </p>
          </Col>
        </Row>
      </Container>

      {/* {user ? <JSONPretty data={entities} /> : ""} */}
    </>
  );
}
