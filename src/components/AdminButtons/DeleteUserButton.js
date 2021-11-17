import React, { useState } from "react";
import { Form, Button, Modal, Spinner } from "react-bootstrap";
import authApi from "../../services/authApi";
import { BsFillTrashFill } from "react-icons/bs";
import { useHistory } from "react-router-dom";

function DeleteUserModal({ user, handleClose }) {
  const history = useHistory();

  const [animate, setAnimate] = useState(false);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [formularioRechazado, cambiarFormularioRechazado] = useState(false);

  async function deleteUserById(user) {
    await authApi.deleteUser(user, history);
  }

  async function handleSubmit() {
    try {
      await deleteUserById(user);
      setTimeout(() => handleClose(), 3000);
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
            ¿Está seguro que desea elimniar al usuario {user.usName}{" "}
            {user.usLastName}?
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
            {user.usName} {user.usLastName} eliminado con éxito!
          </p>
        )}
      </Form.Group>
    </Form>
  );
}

const DeleteEntityButton = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="smartFontModal w-100"
        variant="danger"
        onClick={handleShow}
      >
        <div className="p-1">
          <BsFillTrashFill className="m-1" />
          <span className="p-1">Eliminar</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <DeleteUserModal user={user} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default DeleteEntityButton;
