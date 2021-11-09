import React, { useContext, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import firewareApi from "../../services/fiwareApi";
import { Formik } from "formik";

const AddGoalButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  function AddGoalModal() {
    const { setUpdate } = useContext(UpdateContext);

    async function handleSubmit(valores) {
      const data = await createGoal(item.id);
      async function createGoal(id) {
        return await firewareApi.postNewGoal(valores, id);
      }

      if (data) {
        setTimeout(() => handleClose(), 1000);
        setUpdate((state) => !state);
      } else {
        alert("Error");
      }
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
            monto: "",
            fecha: "",
          }}
          validate={(valores) => {
            let errores = {};
            let dias = Math.round(
              (Date.now() - Date.parse(valores.fecha)) / (1000 * 60 * 60 * 24)
            );

            if (!valores.monto) {
              errores.monto = "Por favor ingrese un monto";
            } else if (isNaN(valores.monto)) {
              errores.monto = "Por favor, ingrese un monto numérico";
            }
            if (!valores.fecha) {
              errores.fecha = "Por favor ingrese una fecha";
            } else if (dias > 0) {
              errores.fecha =
                "Por favor ingrese una fecha posterior a la actual";
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
            <form className="row p-4" onSubmit={handleSubmit}>
              <div className="row ">
                <label htmlFor="monto">
                  <b>Monto esperado</b>
                </label>
                <div className="w-100 mt-2 mb-1">
                  <input
                    className="mb-3 w-100"
                    type="Integer"
                    id="monto"
                    name="monto"
                    placeholder="Ingrese el monto esperado"
                    value={values.monto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                {touched.monto && errors.monto && (
                  <div style={{ color: "red" }}>{errors.monto}</div>
                )}
                </div>
              </div>
              <div className="row mb-1">
                <label htmlFor="fecha">
                  <b>Fecha</b>
                </label>
                <div className="w-100 mt-2 mb-2">
                  <input
                    className="w-100"
                    type="date"
                    id="fecha"
                    name="fecha"
                    placeholder="Ingrese una fecha"
                    value={values.fecha}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                </div>
                {touched.fecha && errors.fecha && (
                  <div style={{ color: "red" }}>{errors.fecha}</div>
                )}
              </div>
              <div className="row d-flex justify-content-center">
                <button className="btn btn-primary w-100 " type="submit">
                  Crear meta
                </button>
                {formularioEnviado && (
                  <p style={{ color: "green" }}>Meta cargada con éxito!</p>
                )}
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <>
      <Button className="btn-load-goal" onClick={handleShow}>
        Cargar Meta
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <AddGoalModal />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddGoalButton;
