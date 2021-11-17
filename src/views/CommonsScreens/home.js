import "react-json-pretty/themes/monikai.css";
import { Container, Col, Row, Image } from "react-bootstrap";

export default function Home() {
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
              className="mt-5 mb-3"
            />
          </Col>
        </Row>
        <Row className="text-center mb-3 mt-4">
          <h2 className="flex-row align-self-center fs-1 p-2 m-3">
            ¿Que es el instuto Ciudades del Futuro?
          </h2>
          <p className="flex-row m-2">
            El Instituto de Ciudades del Futuro (ICF) es un organismo que
            acompaña a las comunidades locales de Argentina en el diseño y la
            implementación de iniciativas innovadoras para un desarrollo humano
            sostenible e inclusivo que, a través del uso de nuevas tecnologías y
            modelos de gestión inteligentes y participativos, mejore la calidad
            de vida de las generaciones actuales y futuras. Para ello promueve
            la transformación social y productiva, valorizando y respetando el
            patrimonio natural y cultural.
          </p>
        </Row>
        <hr />
        <Row>
          <Col className="d-flex flex-column">
            <h2 className="flex-row align-self-center fs-1 p-2 m-3">Mision</h2>
            <p className="flex-row m-2">
              Acelerar la transformación de las ciudades de Latinoamérica,
              anticipando su desarrollo futuro.
            </p>
          </Col>
          <Col className="d-flex flex-column">
            <h2 className="flex-row align-self-center fs-1 p-2 m-3">Vision</h2>
            <p className="flex-row m-2">
              Ser la organización de referencia obligada en Latinoamerica. Ser
              reconocida como la institución más influyente en la transformación
              inteligente de las ciudades de Latinoamérica.
            </p>
          </Col>
          <Col className="d-flex flex-column">
            <h2 className="flex-row align-self-center fs-1 p-2 m-3">Valores</h2>
            <p>
              Vocación Pública - Transparencia - Eficiencia - Innovación -
              Igualdad - Creatividad - Servicio - Responsabilidad
            </p>
          </Col>
        </Row>
      </Container>
    </>
  );
}
