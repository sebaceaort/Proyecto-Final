import React, { useContext, useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import firewareApi from "../../services/fiwareApi";
import { UpdateContext } from "../../context/update-context";

function DeleteEntityModal({ item, handleClose }) {
  const { setUpdate } = useContext(UpdateContext);
  const [animate, setAnimate] = useState(false);
  async function handleSubmit() {
    try {
      await firewareApi.deleteEntity(item.type, item.id);

      alert(item.name.value + " eliminado con éxito");
      handleClose();
      setUpdate((state) => !state);
    } catch (error) {
      setAnimate(false);
      alert("Ups! Algo salió mal!");
    }
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
