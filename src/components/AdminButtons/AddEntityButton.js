import React, { useContext, useState } from "react";
import { Form, Button, Image, Modal, InputGroup } from "react-bootstrap";

import { Formik, Field } from "formik";
import firewareApi from "../../services/fiwareApi";
import { UpdateContext } from "../../context/update-context";
import { MdLibraryAdd } from "react-icons/md";
import imgIndicator from "../../assets/indicadores.jpg";
import imgEje from "../../assets/eje.jpg";
import imgSubEje from "../../assets/subEje.jpg";
import imgMuni from "../../assets/muniAdd.jpg";

function AddEntityModal({ item, handleClose }) {
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

  function selectImg(type) {
    switch (type) {
      case "SubEje":
        return (
          <Image
            src={imgIndicator}
            fluid
            className="rounded img-fluid mb-2 mt-2"
          />
        );
      case "Eje":
        return (
          <Image
            src={imgSubEje}
            fluid
            className="rounded img-fluid mb-2 mt-2"
          />
        );
      case "Municipio":
        return (
          <Image
            src={imgEje}
            
            className="rounded mx-auto img-fluid mb-2 mt-2"
          />
        );
      default:
        return (
          <Image
            src={imgMuni}
            fluid
            className= "rounded img-fluid mb-2 mt-2"
          />
        );
    }
  }

  const { setUpdate } = useContext(UpdateContext);

  async function handleSubmit(valores) {
    try {
      await firewareApi.postEntity(valores, element, item.id);
      setTimeout(() => handleClose(), 1000);
    } catch (error) {
      alert("Ups! Algo salió mal!");
    }
    setUpdate((state) => !state);
  }

  return (
    <div className="container-login">
      {selectImg(item.type)}
      <Formik
        initialValues={{
          nombre: "",
          descripcion: "",
          tipoDato: "",
        }}
        validate={(valores) => {
          let errores = {};
          if (!valores.nombre) {
            errores.nombre = "Por favor ingrese un " + element;
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,50}$/.test(valores.nombre)) {
            errores.nombre =
              "El " + element + " solo puede contener letras y espacios";
          } else if (valores.nombre.trim() === 0) {
            errores.nombre = "Por favor ingrese un " + element + " no vacío";
          }
          if (element === "Indicator") {
            if (!valores.descripcion) {
              errores.descripcion = "Por favor ingrese una descripción";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,600}$/.test(valores.descripcion)) {
              errores.descripcion =
                "La descripción solo puede contener letras y espacios";
            } else if (valores.descripcion.trim() === 0) {
              errores.descripcion =
                "Por favor ingrese una descripcion no vacía";
            }
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
          <form className="row p-3 smartFontModal" onSubmit={handleSubmit}>
            <div className="row mb-3">
              <label htmlFor="nombre">
                <b>Nombre del {element}:</b>
              </label>
              <div className="w-100">
                <input
                  className="mt-2 mb-3 w-100"
                  type="Text"
                  id="nombre"
                  name="nombre"
                  placeholder="Ingrese el nombre esperado"
                  value={values.nombre}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.nombre && errors.nombre && (
                  <div style={{ color: "red" }}>{errors.nombre}</div>
                )}
              </div>
              {element === "Indicator" && (
                <>
                  <label htmlFor="nombre">
                    <b>Tipo de dato</b>
                  </label>
                  <InputGroup className="mt-2 mb-3">
                    <Field
                      name="tipoDato"
                      as="select"
                      value={values.tipoDato}
                      onChange={handleChange}
                      onBlur={handleBlur}
                    >
                      <option>Seleccione el tipo de dato...</option>
                      <option value="Numero">Número</option>
                      <option value="Indice">Indice</option>
                      <option value="Porcentaje">Porcentaje</option>
                      <option value="Monto">Monto</option>
                    </Field>
                  </InputGroup>
                  {values.tipoDato === "Seleccione el tipo de dato..." && (
                    <div style={{ color: "red" }}>
                      Por favor selecciona un tipo de dato
                    </div>
                  )}

                  <div className="mb-3 w-100">
                    <label htmlFor="nombre">
                      <b>Descripción</b>
                    </label>
                    <div className="mt-2 w-100">
                      <Form.Control
                        className="w-100"
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
                      {touched.descripcion && errors.descripcion && (
                        <div style={{ color: "red" }}>{errors.descripcion}</div>
                      )}
                    </div>
                  </div>
                </>
              )}
            </div>
            <div className="row">
              <div className=" w-100 text-center">
                <button className="btn btn-primary  w-100" type="submit">
                  Crear {element}
                </button>
                {formularioEnviado && (
                  <p style={{ color: "green" }}>{element} cargado con éxito!</p>
                )}
              </div>
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

  function declararElement(type) {
    switch (type) {
      case "SubEje":
        return "Indicador";
      case "Eje":
        return "SubEje";
      case "Municipio":
        return "Eje";
      default:
        return "Municipio";
    }
  }

  return (
    <>
      <Button className="smartFontModal" variant="success" onClick={handleShow}>
        <div>
          <MdLibraryAdd className="m-1" />
          <span className="p-1">Agregar</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <h1 className="text-center smartFontModal fs-3">
            Nuevo {declararElement(item.type)}
          </h1>
        </Modal.Header>
        <Modal.Body>
          <AddEntityModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddEntityButton;
