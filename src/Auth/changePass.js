import React, { useContext, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";

import { Formik } from "formik";
import authApi from "../services/authApi";
import { useHistory } from "react-router";
import { UserContext } from "../context/user-context";

function ChangePassModal({ handleClose }) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const [animate, setAnimate] = useState(false);
  const { user } = useContext(UserContext);

  async function handleSubmit(valores) {
    await authApi
      .changePassword(user.usEmail, valores)
      .then(() => setTimeout(() => handleClose(), 1000))
      .catch((error) => {
        setAnimate(false);
        alert("Ups! Algo salió mal!");
      });
  }

  return (
    <div className="container-login">
      <Image
        src="https://pbs.twimg.com/media/EGnVk29XYAMpxVX.jpg"
        fluid
        className="centered-image"
      />

      <Formik
        initialValues={{
          password: "",
          newPassword: "",
          newPasswordConf: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.password) {
            errores.password = "Por favor ingrese su contraseña actual ";
          }
          if (!valores.newPassword) {
            errores.newPassword = "Por favor ingrese su nueva contraseña";
          }
          if (!valores.newPasswordConf) {
            errores.newPassword =
              "Por favor ingrese otra vez la nueva contraseña";
          }
          if (valores.newPassword != valores.newPasswordConf) {
            errores.newPassword = "Las nuevas contraseñas no coinciden";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 1000);
          handleSubmit(valores);
        }}
      >
        {({
          values,
          errors,
          handleSubmit,
          handleChange,
          handleBlur,
          touched,
        }) => (
          <form className="row" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="nombre">Contraseña actual:</label>
              <input
                className="mb-3"
                controlId="formPassword"
                type="password"
                id="password"
                name="password"
                placeholder="Contraseña actual"
                value={values.password}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.password && errors.password && (
                <div style={{ color: "red" }}>{errors.password}</div>
              )}
            </div>

            <div className="row mb-3">
              <label htmlFor="nombre">Nueva contraseña:</label>
              <input
                className="mb-3"
                controlId="formNewPassword"
                type="password"
                id="newPassword"
                name="newPassword"
                placeholder="Nueva contraseña"
                value={values.newPassword}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.newPassword && errors.newPassword && (
                <div style={{ color: "red" }}>{errors.newPassword}</div>
              )}
            </div>

            <div className="row mb-3">
              <label htmlFor="nombre">Confirmar nueva contraseña:</label>
              <input
                className="mb-3"
                controlId="formNewPasswordConf"
                type="password"
                id="newPasswordConf"
                name="newPasswordConf"
                placeholder="Confirmar nueva contraseña"
                value={values.newPasswordConf}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.newPasswordConf && errors.newPasswordConf && (
                <div style={{ color: "red" }}>{errors.newPasswordConf}</div>
              )}
            </div>

            <div>
              <button className="btn btn-primary" type="submit">
                Cambiar
              </button>
              {formularioEnviado && (
                <p style={{ color: "green" }}>Contraseña cambiada con éxito!</p>
              )}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

const ChangePassButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const history = useHistory();
  const { setUser } = useContext(UserContext);
  const logout = () => {
    setUser(null);
    window.localStorage.clear("user");
    history.push("/");
  };
  const handleClose = () => {
    setShow(false);
    alert("Su contraseña ha sido cambiada exitosamente");
    logout();
  };
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="outline-info" onClick={handleShow} className="mt-2 mb-4">
        Cambiar contraseña
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangePassModal handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ChangePassButton;
