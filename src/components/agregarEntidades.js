import React, { useState } from "react";
import {
  Form,
  Button,
  Image,
  Modal,
  Spinner,
  InputGroup,
} from "react-bootstrap";

import firewareApi from "../services/fiwareApi";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

//agregar POST
function AddEntityModal({ item, handleClose }) {
  const [animate, setAnimate] = useState(false);

  const [datos, setDatos] = useState({
    nombre: "",
    descripcion: "",
    tipoDato: "Número",
  });

  const handleChangeDatos = (value, prop) => {
    setDatos({ ...datos, [prop]: value });
  };

  const element = declararElement(item.type);
  function declararElement(type) {
    switch (type) {
      case "SubEje":
        return "Indicator";
      case "Eje":
        return "SubEje";
      case "Municipio":
        return "Eje";
      default:
        return "Municipio";
    }
  }

  async function handleSubmit() {
    try {
      const data = await firewareApi.postEntity(datos, element, item.id);
      alert(JSON.stringify(data.name.value) + " fue agregado exitosamente");
      handleClose();
    } catch (error) {
      setAnimate(false);
      alert("Ups! Algo salió mal!");
    }
  }

  return (
    <div className="container-login">
      <Image
        src="https://pbs.twimg.com/media/EGnVk29XYAMpxVX.jpg"
        fluid
        className="centered-image"
      />
      <Form
        onSubmit={(e) => {
          e.preventDefault();
          setAnimate(true);
          handleSubmit();
        }}
      >
        <Form.Group className="mb-3" controlId="formNombreMun">
          <Form.Label>Nombre del {element}:</Form.Label>
          <Form.Control
            required
            type="text"
            placeholder="Nombre" //ver VALIDATIONS!!!!!!!!!!!!
            onChange={(nombre) => {
              handleChangeDatos(nombre.target.value, "nombre");
            }}
          />
        </Form.Group>

        {element === "Indicator" ? ( //SI ES INDICATOR UN COSA
          <>
            <Form.Label>Tipo de dato:</Form.Label>
            <InputGroup className="mb-3" controlId="formNombreMun">
              <Form.Control
                required
                type="text"
                value={datos.tipoDato}
                disabled
                readonly //ver VALIDATIONS!!!!!!!!!!!!
              />

              <DropdownButton
                align="end"
                id="dropdown-menu"
                onSelect={(tipoDato) => {
                  handleChangeDatos(tipoDato, "tipoDato");
                }}
              >
                <Dropdown.Item eventKey="Número">Número</Dropdown.Item>
                <Dropdown.Item eventKey="Índice">Índice</Dropdown.Item>
                <Dropdown.Item eventKey="Porcentaje">Porcentaje</Dropdown.Item>
              </DropdownButton>
            </InputGroup>

            <Form.Group className="mb-3" controlId="formDescripcion">
              <Form.Label>Descripcion:</Form.Label>
              <Form.Control
                required
                type="text"
                //ver VALIDATIONS!!!!!!!!!!!!
                onChange={(descripcion) => {
                  handleChangeDatos(descripcion.target.value, "descripcion");
                }}
              />
            </Form.Group>
          </>
        ) : null}

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
            {!animate ? "Agregar" : "Loading..."}
          </Button>
        </Form.Group>
      </Form>
    </div>
  );
}

const AddEntityButton = ({ item = { type: "" } }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Add
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddEntityModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddEntityButton;
