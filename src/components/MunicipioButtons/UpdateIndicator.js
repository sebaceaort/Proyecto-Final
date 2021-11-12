import React, { useContext, useState } from "react";
import { Button, Image, Modal } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import firewareApi from "../../services/fiwareApi";
import { Formik } from "formik";
import{GrIndicator} from"react-icons/gr"
import img from "../../assets/indicador.jpg"

const IndicatorDataButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  function IndicatorDataModal() {
    const { setUpdate } = useContext(UpdateContext);

    async function handleSubmit(valores) {
      const data = await loadDataIndicator(item.id);
      async function loadDataIndicator(id) {
        return await firewareApi.loadData(valores, id);
      }

      if (data) {
        setTimeout(() => handleClose(), 1000);
      } else {
        alert("Error");
      }
      setUpdate((state) => !state);
    }

    return (
      <div className="container-login p-3">
        <Image
          src={img}
          fluid
          className="rounded img-fluid mb-2 mt-2"
        />

        <Formik
          initialValues={{
            monto: "",
          }}
          validate={(valores) => {
            let errores = {};

            if (!valores.monto) {
              errores.monto = "Por favor ingrese un monto";
            } else if (isNaN(valores.monto)) {
              errores.monto = "Por favor, ingrese un monto numérico";
            } else if (valores.monto.trim() === 0) {
              errores.monto = "Por favor ingrese un monto";
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
            <form className="row smartFontModal " onSubmit={handleSubmit}>
              <div className="row mb-3 ">
                <label className="mb-2" htmlFor="monto">
                  <b>Monto esperado</b>
                </label>
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
                  />
                </div>
                {touched.monto && errors.monto && (
                  <div style={{ color: "red" }}>{errors.monto}</div>
                )}

                <div className="mt-3 w-100 text-center">
                  <button className="btn btn-primary w-100" type="submit">
                    Cargar data indicador
                  </button>
                  {formularioEnviado && (
                    <p style={{ color: "green" }}>Data cargada con éxito!</p>
                  )}
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
      <Button className="btn-load-indicator" onClick={handleShow}>
        <GrIndicator className="fs-4"/>
        <div className="ms-2">  Cargar data indicador</div>      
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>   <h1 className="text-center smartFontModal fs-3">Carga de Indicador</h1></Modal.Header>
        <Modal.Body className="pr-2">
          <IndicatorDataModal />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default IndicatorDataButton;
