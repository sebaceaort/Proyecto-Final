import React, { useContext, useState } from "react";
import { Form, Button, Image, Modal, InputGroup } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import fiwareApi from "../../services/fiwareApi";
import { Formik, Field } from "formik";
import { FaPencilAlt } from "react-icons/fa";
import imgIndicator from "../../assets/EditImg/edit3.jpg";
import imgEje from "../../assets/EditImg/edit.jpg";
import imgSubEje from "../../assets/EditImg/edit2.jpg";
import imgMuni from "../../assets/EditImg/editmuni.jpg";
import { Entities } from "../../enums/Entities";
import { TipoIndicador } from "../../enums/TipoIndicador";

function UpdateEntityModal({ item, handleClose }) {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(0);
  const { setUpdate } = useContext(UpdateContext);
  const entityType = item.type;

  async function handleSubmit(valores) {
    try {
      await fiwareApi.updateEntity(valores, item.id);
      cambiarFormularioEnviado(1);
      setTimeout(() => cambiarFormularioEnviado(0), 1000);
      setTimeout(() => handleClose(), 1000);
    } catch (error) {
      cambiarFormularioEnviado(2);
      setTimeout(() => cambiarFormularioEnviado(0), 1000);
    }
    setUpdate((state) => !state);
  }

  function selectImg(type) {
    switch (type) {
      case Entities.subeje:
        return (
          <Image
            src={imgSubEje}
            fluid
            className="rounded img-fluid mb-2 mt-2"
          />
        );
      case Entities.eje:
        return (
          <Image src={imgEje} fluid className="rounded img-fluid mb-2 mt-2" />
        );
      case Entities.municipio:
        return (
          <Image src={imgMuni} fluid className="rounded img-fluid mb-2 mt-2" />
        );
      default:
        return (
          <Image
            src={imgIndicator}
            fluid
            className="rounded img-fluid mb-2 mt-2"
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
          if (entityType !== Entities.indicador) {
            if (!valores.name) {
              errores.name = "Por favor ingrese un " + entityType;
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,60}$/.test(valores.name)) {
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
            } else if (!/^[a-zA-ZÀ-ÿ\s]{1,60}$/.test(valores.name)) {
              errores.name =
                "El " + entityType + " solo puede contener letras y espacios";
            } else if (valores.name.trim() === 0) {
              errores.name = "Por favor ingrese un " + entityType + " no vacío";
            }
            if (!valores.description) {
              errores.description = "Por favor ingrese una descripción";
            } else if (valores.description.trim() === 0) {
              errores.description =
                "Por favor ingrese una descripcion no vacía";
            } else if (
              !/^[a-zA-ZÀ-ÿ.,+-\s]{1,650}$/.test(valores.description)
            ) {
              errores.description =
                "La descripcion solo puede contener letras, espacios, puntos,  comas,  '+' y '-'";
            }
          }

          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
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
                  maxlength="60"
                />
                {touched.name && errors.name && (
                  <div style={{ color: "red" }}>{errors.name}</div>
                )}
              </div>
            </div>
            {entityType === Entities.indicador && (
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
                    <option value={TipoIndicador.numero}>Número</option>
                    <option value={TipoIndicador.indice}>Indice</option>
                    <option value={TipoIndicador.porcentaje}>Porcentaje</option>
                    <option value={TipoIndicador.monto}>Monto</option>
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
                        maxlength="650"
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
                {formularioEnviado === 1 ? (
                  <p style={{ color: "green" }}>
                    {entityType} cambiado con éxito!
                  </p>
                ) : formularioEnviado === 2 ? (
                  <p style={{ color: "red" }}>
                    Hubo un fallo en la edición de {entityType}!
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
        <Modal.Header closeButton>
          <h1 className="text-center smartFontModal fs-3">
            Editar {item.type}
          </h1>
        </Modal.Header>
        <Modal.Body>
          <UpdateEntityModal item={item} handleClose={handleClose} />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default UpdateEntityButton;
