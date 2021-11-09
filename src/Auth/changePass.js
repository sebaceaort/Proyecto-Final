import React, { useContext, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";

import { Formik } from "formik";
import authApi from "../services/authApi";
import { useHistory } from "react-router-dom";
import { UserContext } from "../context/user-context";

function ChangePassModal({handleClose}) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);  
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
          handleClose()
          alert("Su contraseña fue cambiada exitosamente")
          logout()
        })
      .catch((error) => {        
        alert(error);
        handleClose()
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
          if (valores.password === valores.newPassword){
            errores.newPassword = "La contraseña nueva debe ser distinta a la actual";
          }
          if (!valores.newPassword) {
            errores.newPassword = "Por favor ingrese su nueva contraseña";
          }
          if (!valores.newPasswordConf) {
            errores.newPasswordConf =
              "Por favor ingrese otra vez la nueva contraseña";
          }
          if (valores.newPassword != valores.newPasswordConf) {
            errores.newPasswordConf = "Las nuevas contraseñas no coinciden";
          }
          return errores;
        }}
        onSubmit={async (valores, { resetForm }) => {
          resetForm();
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 1000);
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
              {formularioEnviado}            
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
      <Button variant="outline-info" onClick={handleShow} className="mt-2 mb-4">
        Cambiar contraseña
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <ChangePassModal handleClose = {handleClose}/>
        </Modal.Body>
      </Modal>
    </>
  );
};
export default ChangePassButton;
