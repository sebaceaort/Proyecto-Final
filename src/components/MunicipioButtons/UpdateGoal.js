import React, { useContext, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import firewareApi from "../../services/fiwareApi";
import { Formik } from "formik";
import {GiStairsGoal} from "react-icons/gi"
import img from "../../assets/meta2.png"

const AddGoalButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(0);
  function AddGoalModal() {
    const { setUpdate } = useContext(UpdateContext);

    async function handleSubmit(valores) {
      const data = await createGoal(item.id);
      async function createGoal(id) {
        return await firewareApi.postNewGoal(valores, id);
      }

      if (data) {
        setTimeout(() => handleClose(), 500);
        cambiarFormularioEnviado(1);
        setTimeout(() => cambiarFormularioEnviado(0), 500);
        setUpdate((state) => !state);
      } else {
        cambiarFormularioEnviado(2);
        setTimeout(() => cambiarFormularioEnviado(0), 1000);
      }
    }

    return (
      <div className="container-login">
        <Image
          src= {img}
          fluid
          className="rounded img-fluid mb-2 mt-2"
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
            } else if (valores.monto.trim() === 0) {
              errores.monto = "Por favor ingrese un monto";
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
            <form className="row smartFontModal p-3" onSubmit={handleSubmit}>
              <div className="row mb-3">
                <label htmlFor="monto">Monto esperado</label>
                <div className=" w-100">
                  <input
                    className="mb-1 w-100"
                    type="Integer"
                    id="monto"
                    name="monto"
                    placeholder="Ingrese el monto esperado"
                    value={values.monto}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    maxlength="12"
                  />
                  {touched.monto && errors.monto && (
                    <div style={{ color: "red" }}>{errors.monto}</div>
                  )}
                </div>
              </div>
              <div className="row mb-3">
                <label htmlFor="fecha">Fecha</label>
                <div className=" w-100">
                  <input
                    className="mb-1 w-100"
                    type="date"
                    id="fecha"
                    name="fecha"
                    placeholder="Ingrese una fecha"
                    value={values.fecha}
                    onChange={handleChange}
                    onBlur={handleBlur}
                  />
                  {touched.fecha && errors.fecha && (
                    <div style={{ color: "red" }}>{errors.fecha}</div>
                  )}
                </div>
              </div>
              <div className="row">
                <div className="mt-3 w-100 text-center">
                  <button className="btn btn-primary w-100" type="submit">
                    Crear meta
                  </button>
                  {formularioEnviado===1 ? 
                  <p style={{ color: "green" }}>Meta cargada con éxito!</p>:formularioEnviado===2 ? 
                  <p style={{ color: "red" }}>Hubo un fallo en la carga de la meta!</p> : null}
                </div>
              </div>
            </form>
          )}
        </Formik>
      </div>
    );
  }

  return (
    <>
      <Button className="btn-load-goal h-100 p-1" onClick={handleShow}>
        <div>
        <GiStairsGoal className="fs-4"/>
        <div className="ms-2">Cargar Meta</div>
        </div>
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton><h1 className="text-center smartFontModal fs-3">Carga de Meta</h1></Modal.Header>
        <Modal.Body>
          <AddGoalModal />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default AddGoalButton;
