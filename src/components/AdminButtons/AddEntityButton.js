import React, { useContext, useState } from "react";
import {
  Form,
  Button,
  Image,
  Modal,
  Spinner,
  InputGroup
} from "react-bootstrap";

import { Formik, Field } from "formik";

import firewareApi from "../../services/fiwareApi";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";
import { UpdateContext } from "../../context/update-context";

//agregar POST
function AddEntityModal({ item, handleClose }) {
  const [animate, setAnimate] = useState(false);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  const element = declararElement(item.type);
  function declararElement(type) {
    switch (type) {
      case "SubEje":
        return "Indicator";
      case "Eje":
        return "SubEje";
      case "Municipio":
        return "Eje";
      default:
        return "Municipio";
    }
  }

  const { setUpdate } = useContext(UpdateContext);

  async function handleSubmit(valores) {
    try {
      const data = await firewareApi.postEntity(valores, element, item.id);
      setTimeout(() => handleClose(), 1000)
    } catch (error) {
      setAnimate(false);
      alert("Ups! Algo salió mal!");
    }
    setUpdate((state) => !state);
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
          nombre: "",
          descripcion: "",
          tipoDato: "Número"
        }}
        validate={(valores) => {
          let errores = {};
          let dias = Math.round((Date.now() - Date.parse(valores.fecha)) / (1000 * 60 * 60 * 24));

          if (!valores.nombre) {
            errores.nombre = ('Por favor ingrese un ' + element)
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.nombre)) {
            errores.nombre = ('El ' + element + ' solo puede contener letras y espacios')
          }
          if (!valores.descripcion) {
            errores.descripcion = ('Por favor ingrese una descripción')
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,150}$/.test(valores.descripcion)) {
            errores.descripcion = ('La descripción solo puede contener letras y espacios')
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado")
          cambiarFormularioEnviado(true)
          setTimeout(() => cambiarFormularioEnviado(false), 1000)
          handleSubmit(valores)
        }}
      >
        {({ values, errors, handleSubmit, handleChange, handleBlur, touched }) => (
          <form className="row" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="nombre">Nombre del {element}:</label>
              <input className="mb-3" controlId="formNombre"
                type="Text"
                id="nombre"
                name="nombre"
                placeholder="Ingrese el nombre esperado"
                value={values.nombre}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.nombre && errors.nombre && <div style={{ color: 'red' }}>{errors.nombre}</div>}
            </div>
            {element === "Indicator" ? (
              <>
                <label htmlFor="nombre">Tipo de dato</label>
                <InputGroup className="mb-3">
                  <Field 
                    name="tipoDato"
                    as="select"
                    value={values.tipoDato}
                    onChange={handleChange}
                    onBlur={handleBlur}>

                    <option value="Numero">Número</option>
                    <option value="Indice">Indice</option>
                    <option value="Porcentaje">Porcentaje</option>
                    <option value="Monto">Monto</option>
                  </Field>
                </InputGroup>

                <div className="row mb-3">
                  <label htmlFor="nombre">Descipción</label>
                  <Form.Control
                    required
                    as="textarea"
                    row={3}
                    id="descripcion"
                    name="descripcion"
                    placeholder="Ingrese una descripción"
                    value={values.descripcion}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.descripcion && errors.descripcion && <div style={{ color: 'red' }}>{errors.descripcion}</div>}
                </div>
              </>
            ) : null}
            <div>
              <button className="btn btn-primary" type="submit">Crear {element}</button>
              {formularioEnviado && <p style={{ color: 'green' }}>{element} cargado con éxito!</p>}
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

const AddEntityButton = ({ item = { type: "" } }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button variant="success" onClick={handleShow}>
        Agregar
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddEntityModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddEntityButton;
