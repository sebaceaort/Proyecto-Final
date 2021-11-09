import React, { useContext, useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import firewareApi from "../../services/fiwareApi";
import { UpdateContext } from "../../context/update-context";

function DeleteEntityModal({ item, handleClose }) {
  const { setUpdate } = useContext(UpdateContext);
  const [animate, setAnimate] = useState(false);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [formularioRechazado, cambiarFormularioRechazado] = useState(false);
  async function handleSubmit() {
    try {
      await firewareApi.deleteEntity(item.type, item.id);
      
      setTimeout(() => handleClose(), 3000)
      setUpdate((state) => !state);
    } catch (error) {
      setAnimate(false);
      cambiarFormularioRechazado(true)
      setTimeout(() => cambiarFormularioRechazado(false), 1500)
    }
  }

  return (
    <Form
      onSubmit={(e) => {
        e.preventDefault();
        setAnimate(true);
        cambiarFormularioEnviado(true)
        setTimeout(() => cambiarFormularioEnviado(false), 1500)
        handleSubmit();
      }}
    >
      <Form.Group className="mb-3">
        <Form.Label>
          ¿Está seguro que desea elimniar el {item.type} {item.name.value} ?
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
        {formularioEnviado && <p style={{ color: 'green' }}>{item.type} {item.name.value} eliminado con éxito!</p>}
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
      <Button variant="danger" onClick={handleShow}>
        Eliminar
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
