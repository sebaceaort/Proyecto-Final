import React, { useState } from "react";
import { Button, Modal } from "react-bootstrap";
import { Formik} from "formik";
import { FaPencilAlt } from "react-icons/fa";
import { useHistory } from "react-router-dom";
import authApi from "../../services/authApi";

function UpdateUserModal({ item, handleClose }) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(0);
  const history = useHistory();

  async function handleSubmit(valores) {
    try {
      await authApi.updateUser(valores, item)
      cambiarFormularioEnviado(1);
      setTimeout(() => cambiarFormularioEnviado(0), 1000);
      setTimeout(() => handleClose(), 1000);
      history.replace("/UsersDisabled");
    } catch (error) {
      cambiarFormularioEnviado(2);
      setTimeout(() => cambiarFormularioEnviado(0), 1000);
    }
  }

  
  return (
    <div className="container-login">
      {/* AGREGAR IMAGEN */}
      <Formik
        initialValues={{
          name: item.usName,
          lastname: item.usLastName,
          username: item.usEmail,          
        }}
        validate={(valores) => {
          let errores = {};
          if (!valores.name) {
            errores.name = "Por favor ingrese un nombre";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,60}$/.test(valores.name)) {
            errores.name = "El nombre solo puede contener letras y espacios";
          } else if (valores.name.trim() === "") {
            errores.name = "Por favor ingrese un nombre que no este vacío";
          }
          if (!valores.lastname) {
            errores.lastname = "Por favor ingrese un apellido";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,60}$/.test(valores.lastname)) {
            errores.lastname =
              "El apellido solo puede contener letras y espacios";
          } else if (valores.lastname.trim() === "") {
            errores.lastname =
              "Por favor ingrese un apellido que no este vacío";
          }
          if (!valores.username) {
            errores.username = "Por favor ingrese un email";
          } else if (
            !/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(
              valores.username
            )
          ) {
            errores.username = "El formato de email no es correcto";
          } else if (valores.username.trim() === "") {
            errores.username = "Por favor ingrese un email que no este vacío";
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
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
          <form className="row p-3 smartFontModal" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="name">Ingrese su nombre: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Ingrese el nombre"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxlength="60"
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="lastname">Ingrese su apellido: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="text"
                  id="lastname"
                  name="lastname"
                  placeholder="Ingrese el apellido"
                  value={values.lastname}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxlength="60"
                />
                {touched.lastname && errors.lastname && (
                  <div style={{ color: "red" }}>{errors.lastname}</div>
                )}
              </div>
            </div>
            <div className="row mb-3">
              <label htmlFor="username">Ingrese su Email: </label>
              <div className="w-100">
                <input
                  className="mb-1 mt-2 w-100"
                  type="email"
                  id="username"
                  name="username"
                  placeholder="Ingrese el email"
                  value={values.username}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  maxlength="75"
                />
                {touched.username && errors.username && (
                  <div style={{ color: "red" }}>{errors.username}</div>
                )}
              </div>
            </div>
            
            <div className="row">
              <div className=" w-100 text-center">
                <button className="btn btn-primary  w-100" type="submit">
                  Editar
                </button>
                {formularioEnviado===1 ? 
                  <p style={{ color: "green" }}>Cambiado con éxito!</p>:formularioEnviado===2 ? 
                  <p style={{ color: "red" }}>Hubo un fallo en la edición del usuario!</p> : null}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

const UpdateUserButton = ({ user }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const item = user;
  

  return (
    <>
      <Button
        className="smartFontModal w-100"
        variant="warning"
        onClick={handleShow}
      >
        <div className="p-1">
          <FaPencilAlt className="mb-1" />
          <span className="p-1">Editar</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1 className="text-center smartFontModal fs-3">Editar</h1>
        </Modal.Header>
        <Modal.Body>
          <UpdateUserModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateUserButton;
