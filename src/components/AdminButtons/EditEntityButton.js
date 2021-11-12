import React, { useContext, useState } from "react";
import { Form, Button, Image, Modal, InputGroup } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import fiwareApi from "../../services/fiwareApi";
import { Formik, Field } from "formik";
import { FaPencilAlt } from "react-icons/fa";

import imgIndicator from "../../assets/edit3.jpg";
import imgEje from "../../assets/edit.jpg";
import imgSubEje from "../../assets/edit2.jpg";
import imgMuni from "../../assets/editmuni.jpg";

//agregar POST
function UpdateEntityModal({ item, handleClose }) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  const entityType = item.type;

  const { setUpdate } = useContext(UpdateContext);

  async function handleSubmit(valores) {
    try {
      await fiwareApi.updateEntity(valores, item.id);
      setTimeout(() => handleClose(), 500);
      handleClose();
    } catch (error) {}
    setUpdate((state) => !state);
  }

  function selectImg(type) {
    switch (type) {
      case "SubEje":
        return (
          <Image
            src={imgSubEje}
            fluid
            className="rounded img-fluid mb-2 mt-2"
          />
        );
      case "Eje":
        return (
          <Image
            src={imgEje}
            fluid
            className="rounded img-fluid mb-2 mt-2"
          />
        );
      case "Municipio":
        return (
          <Image
            src={imgMuni}
            fluid
            className="rounded img-fluid mb-2 mt-2"
          />
        );
      default:
        return (
          <Image
            src={imgIndicator}
            fluid
            className= "rounded img-fluid mb-2 mt-2"
          />
        );
    }
  }
  return (
    <div className="container-login">
     
    {selectImg(item.type)}
      <Formik
        initialValues={{
          name: item.name.value,
          description: item.description?.value,
          indicatorType: item.indicatorType?.value,
        }}
        validate={(valores) => {
          let errores = {};
          if (entityType !== "Indicador") {
            if (!valores.name) {
              errores.name = "Por favor ingrese un " + entityType;
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
              errores.name =
                "El " + entityType + " solo puede contener letras y espacios";
            } else if (valores.name.trim() === 0) {
              errores.name = "Por favor ingrese un " + entityType + " no vacío";
            } else if (valores.name === item.name.value) {
              errores.name =
                "Por favor ingrese un " + entityType + " distinto al anterior";
            }
          } else {
            if (!valores.name) {
              errores.name = "Por favor ingrese un " + entityType;
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.name)) {
              errores.name =
                "El " + entityType + " solo puede contener letras y espacios";
            } else if (valores.name.trim() === 0) {
              errores.name = "Por favor ingrese un " + entityType + " no vacío";
            }
            if (!valores.description) {
              errores.description = "Por favor ingrese una descripción";
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,150}$/.test(valores.description)) {
              errores.description =
                "La descripción solo puede contener letras y espacios";
            } else if (valores.description.trim() === 0) {
              errores.description =
                "Por favor ingrese una descripcion no vacía";
            }
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
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
              <label htmlFor="name">
                <b>Nombre del {entityType}:</b>
              </label>
              <div className="w-100">
                <input
                  className="mt-2 mb-3 w-100"
                  type="Text"
                  id="name"
                  name="name"
                  placeholder="Ingrese el nombre esperado"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
            </div>
            {entityType === "Indicator" && (
              <>
                <label htmlFor="indicatorType">
                  <b>Tipo de dato</b>
                </label>
                <InputGroup className="mt-2 mb-3">
                  <Field
                    name="indicatorType"
                    as="select"
                    value={values.indicatorType}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  >
                    <option value="Numero">Número</option>
                    <option value="Indice">Indice</option>
                    <option value="Porcentaje">Porcentaje</option>
                    <option value="Monto">Monto</option>
                  </Field>
                </InputGroup>

                <div className="row mb-3">
                  <div className="mb-3 w-100">
                    <label htmlFor="description">
                      <b>Descripción</b>
                    </label>
                    <div className="mt-2 w-100">
                      <Form.Control
                        required
                        as="textarea"
                        row={3}
                        id="description"
                        name="description"
                        placeholder="Ingrese una descripción"
                        value={values.description}
                        onChange={handleChange}
                        onBlur={handleBlur}
                      />
                      {touched.description && errors.description && (
                        <div style={{ color: "red" }}>{errors.description}</div>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}
            <div className="row">
              <div className=" w-100 text-center">
                <button className="btn btn-primary  w-100" type="submit">
                  Editar {entityType}
                </button>
                {formularioEnviado && (
                  <p style={{ color: "green" }}>
                    {entityType} cambiado con éxito!
                  </p>
                )}
              </div>
            </div>
          </form>
        )}
      </Formik>
    </div>
  );
}

const UpdateEntityButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Button
        className="smartFontModal"
        variant="secondary"
        onClick={handleShow}
      >
        <div>
          <FaPencilAlt className="mb-1" />
          <span className="p-1">Editar</span>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>  <h1 className="text-center smartFontModal fs-3">
            Editar {item.type}
          </h1></Modal.Header>
        <Modal.Body>
          <UpdateEntityModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateEntityButton;
