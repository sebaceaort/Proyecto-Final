import React, { useState, useContext } from "react";
import { Form, Button, Image, Modal, Spinner } from "react-bootstrap";
import { UserContext } from "../context/user-context";
import login from "../services/authApi";

const LoginButton = () => {
  const [show, setShow] = useState(false);
  const [validation, setValidation] = useState(0);
  const { setUser } = useContext(UserContext);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  function LoginModal() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [animate, setAnimate] = useState(false);

    async function doLogin(usr, pass) {
      try {
        return await login.login(usr, pass);
      } catch (error) {
        // console.log(error);
      }
    }

    async function handleSubmit() {
      const data = await doLogin(username, password);
      let cleanUp;
      if (data) {
        if (data.usActive) {
          setUser(data);
          window.localStorage.setItem("user", JSON.stringify(data));
          handleClose();
        } else {
          setValidation(1);
          cleanUp = setTimeout(() => setValidation(0), 2000);
          setAnimate(false);
        }
      } else {
        setValidation(2);
        cleanUp = setTimeout(() => setValidation(0), 2000);
        setAnimate(false);
      }
      clearInterval(cleanUp);
    }

    return (
      <div className="container-login smartFontModal">
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
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Nombre de usuario:</b>
            </Form.Label>
            <Form.Control
              required
              type="email"
              placeholder="Nombre de usuario"
              autoComplete="username"
              onChange={(usr) => {
                setUsername(usr.target.value);
              }}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>
              <b>Contraseña:</b>
            </Form.Label>
            <Form.Control
              required
              type="password"
              placeholder="Contraseña"
              autoComplete="current-password"
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
          {validation === 2 ? (
            <p style={{ color: "red" }}>Usuario o contraseña incorrectos</p>
          ) : validation === 1 ? (
            <p style={{ color: "red" }}>
              Usuario Inhabilitado, contactese con un administrador
            </p>
          ) : null}
        </Form>
      </div>
    );
  }

  return (
    <>
      <Button className="smartFontModal" variant="primary" onClick={handleShow}>
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
