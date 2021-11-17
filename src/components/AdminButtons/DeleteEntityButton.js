import React, { useContext, useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import firewareApi from "../../services/fiwareApi";
import { UpdateContext } from "../../context/update-context";
import { BsFillTrashFill } from "react-icons/bs";

function DeleteEntityModal({ item, handleClose }) {
  const { setUpdate } = useContext(UpdateContext);
  const [animate, setAnimate] = useState(false);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [formularioRechazado, cambiarFormularioRechazado] = useState(false);

  async function handleSubmit() {
    try {
      await firewareApi.deleteEntity(item.type, item.id);
      setTimeout(() => handleClose(), 3000);
      setUpdate((state) => !state);
    } catch (error) {
      setAnimate(false);
      cambiarFormularioRechazado(true);
      setTimeout(() => cambiarFormularioRechazado(false), 1500);
    }
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setAnimate(true);
        cambiarFormularioEnviado(true);
        setTimeout(() => cambiarFormularioEnviado(!formularioRechazado), 1500);
        handleSubmit();
      }}
    >
      <Form.Group className="mb-3 text-center smartFontModal">
        <Form.Label className="mb-3">
          <b>
            ¿Está seguro que desea eliminar el {item.type} {item.name.value}?
          </b>
        </Form.Label>
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
          {!animate ? "Confirmar" : "Eliminando..."}
        </Button>
        {formularioEnviado && (
          <p style={{ color: "green" }}>
            {item.type} {item.name.value} eliminado con éxito!
          </p>
        )}
      </Form.Group>
    </Form>
  );
}

const DeleteEntityButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button className="smartFontModal" variant="danger" onClick={handleShow}>
        <div className="">
          <BsFillTrashFill className="m-1" />
          <span className="p-1">Eliminar</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteEntityModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteEntityButton;
