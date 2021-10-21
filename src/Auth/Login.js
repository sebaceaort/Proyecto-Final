import React, { useState, useContext } from "react";
import { Form, Button, Image, Modal, Spinner } from "react-bootstrap";
import login from "../services/auth";
import { UserContext } from "../user-context";

const LoginButton = () => {
  const [show, setShow] = useState(false);
  
  const { setUser } = useContext(UserContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  
  function LoginModal() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [animate, setAnimate] = useState(false);

    async function doLogin(usr, pass) {
      return await login.login(usr, pass);
    }

    async function handleSubmit() {
      const data = await doLogin(username, password);
      console.log(data);
      if (!data.error) {
        setUser(data);
        window.localStorage.setItem("user", JSON.stringify(data));
        handleClose();
        
      } else {
        alert("Usuario o contraseña incorrectos");
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
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>Nombre de usuario:</Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Nombre de usuario"
              onChange={(usr) => {
                setUsername(usr.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Contraseña"
              onChange={(pass) => {
                setPassword(pass.target.value);
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
              {!animate ? "Iniciar Sesion" : "Loading..."}
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }

  return (
    <>
      <Button variant="primary" onClick={handleShow}>
        Log in
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <LoginModal />
        </Modal.Body>
      </Modal>
    </>
  );
};

export default LoginButton;
