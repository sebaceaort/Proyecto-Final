import React, { useContext, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { Formik } from "formik";
import authApi from "../services/authApi";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user-context";

function ChangePassModal({ handleClose }) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(0);
  const { user } = useContext(UserContext);
  const history = useHistory();
  const { setUser } = useContext(UserContext);

  const logout = () => {
    setUser(null);
    window.localStorage.clear("user");
    history.push("/");
  };

  async function handleSubmit(valores) {
    await authApi
      .changePassword(user.usEmail, valores)
      .then(() => {
        cambiarFormularioEnviado(1);
        setTimeout(() => cambiarFormularioEnviado(0), 1000);
        setTimeout(() => handleClose(), 1000);
        setTimeout(() => logout(), 1500);
      })
      .catch((error) => {
        cambiarFormularioEnviado(2);
        setTimeout(() => cambiarFormularioEnviado(0), 1000);
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
            errores.password = "Por favor ingrese una contraseña";
          } else if (valores.password.replace(" ", "") !== valores.password) {
            errores.password = "Por favor ingrese una contraseña sin espacios";
          } else if (!/^[a-zA-ZÀ-ÿ0-9\s]{6,25}$/.test(valores.password)) {
            errores.password =
              "La contraseña no puede contener caracteres especiales";
          }

          if (!valores.newPassword) {
            errores.newPassword = "Por favor ingrese una contraseña";
          } else if (
            valores.newPassword.replace(" ", "") !== valores.newPassword
          ) {
            errores.newPassword =
              "Por favor ingrese una contraseña sin espacios";
          } else if (!/^[a-zA-ZÀ-ÿ0-9\s]{6,25}$/.test(valores.newPassword)) {
            errores.newPassword =
              "La contraseña no debe contener caracteres especiales";
          } else if (valores.password === valores.newPassword) {
            errores.newPassword =
              "La contraseña nueva debe ser distinta a la actual";
          }
          if (!valores.newPasswordConf) {
            errores.newPasswordConf = "Por favor repita la nueva contraseña";
          } else if (
            valores.newPasswordConf.replace(" ", "") !== valores.newPasswordConf
          ) {
            errores.newPasswordConf =
              "Por favor ingrese una contraseña sin espacios";
          } else if (
            !/^[a-zA-ZÀ-ÿ0-9\s]{6,25}$/.test(valores.newPasswordConf)
          ) {
            errores.newPasswordConf =
              "La contraseña no debe contener caracteres especiales";
          } else if (!(valores.newPasswordConf === valores.newPassword)) {
            errores.newPasswordConf = "Las contraseñas no coinciden";
          }
          return errores;
        }}
        onSubmit={async (valores, { resetForm }) => {
          resetForm();
          await handleSubmit(valores);
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
          <form className="row p-3 smartFontModal" onSubmit={handleSubmit}>
            <div className="row mb-2">
              <label htmlFor="nombre">
                <b>Contraseña actual:</b>
              </label>
              <div className="w-100">
                <input
                  className="mt-2 mb-2 w-100"
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
            </div>

            <div className="row mb-2">
              <label htmlFor="nombre">
                <b>Nueva contraseña:</b>
              </label>
              <div className="w-100">
                <input
                  className="mt-2 mb-2 w-100"
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
            </div>

            <div className="row mb-3">
              <label htmlFor="nombre">
                <b>Confirmar nueva contraseña:</b>
              </label>
              <div className="w-100">
                <input
                  className="mt-2 mb-3 w-100"
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
            </div>

            <div className="row">
              <div className="w-100 text-center">
                <button className="btn btn-primary w-100" type="submit">
                  Cambiar Contraseña
                </button>
                {formularioEnviado === 1 ? (
                  <p style={{ color: "green" }}>La contraseña fue cambiada!</p>
                ) : formularioEnviado === 2 ? (
                  <p style={{ color: "red" }}>
                    Hubo un fallo en el cambio de contraseña!
                  </p>
                ) : null}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

const ChangePassButton = () => {
  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <>
      <Button
        variant="outline-info"
        onClick={handleShow}
        className="mt-2 mb-4 smartFontModal"
      >
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
