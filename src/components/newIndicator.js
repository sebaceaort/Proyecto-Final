import { useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import ocbAuth from "../services/ocbAuth";

export default function NewIndicator() {
  const [eje, setEje] = useState("");
  const [subEje, setSubEje] = useState("");
  const [indicator, setIndicator] = useState("");
  const [description, setDescription] = useState("");
  const [indicatorType, setIndicatorType] = useState("");
  const [animate, setAnimate] = useState(false);

  async function handleSubmit() {
    ocbAuth.postData(eje, subEje, indicator, description, indicatorType);
    //     connection.v2
    //       .createEntity(
    //         {
    //           id: "SmartBA-Indicator-001",
    //           type: "Indicator",
    //           eje: eje,
    //           subEje: subEje,
    //           indicator: indicator,
    //           description: description,
    //           indicatorType: indicatorType
    //         },
    //         { keyValues: true }
    //       )
    //       .then((res) => {
    //         console.log("res ok", res);
    //       })
    //       .catch((err) => {
    //         console.log("Error", err);
    //         setAnimate(false);
    //       });
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setAnimate(true);
        handleSubmit();
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>Ingrese un Eje:</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Nombre del Eje"
          onChange={(e) => {
            setEje(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingrese un SubEje:</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Nombre del Sub eje"
          onChange={(e) => {
            setSubEje(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingrese un Indicador:</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Nombre del Indicador"
          onChange={(e) => {
            setIndicator(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingrese una descripcion:</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="Descripcion"
          onChange={(e) => {
            setDescription(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Form.Label>Ingrese el tipo del indicador:</Form.Label>
        <Form.Control
          required
          type="text"
          placeholder="tipo de indicador. Ej: Numerico, Porcentaje, Indice, etc"
          onChange={(e) => {
            setIndicatorType(e.target.value);
          }}
        />
      </Form.Group>
      <Form.Group className="mb-3">
        <Button
          variant="primary"
          type="submit"
          size="lg"
          className={"full-width"}
        >
          {animate ? (
            <Spinner
              as="span"
              animation="grow"
              size="sm"
              role="status"
              aria-hidden="true"
            />
          ) : (
            ""
          )}
          {!animate ? "Cargar Indicador" : "Loading..."}
        </Button>
      </Form.Group>
    </Form>
  );
}
