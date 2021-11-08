import React, { useContext, useState } from "react";
import { Form, Button, Image, Modal, Spinner } from "react-bootstrap";
import { UpdateContext } from "../../context/update-context";
import firewareApi from "../../services/fiwareApi";
import { Formik } from "formik";

//agregar POST

const IndicatorDataButton = ({ item }) => {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);

  function IndicatorDataModal() {
    const [animate, setAnimate] = useState(false);

    const { setUpdate } = useContext(UpdateContext);

    async function handleSubmit(valores) {
      const data = await loadDataIndicator(item.id);
      async function loadDataIndicator(id) {
        return await firewareApi.loadData(valores, id);
      }

      if (data) {
        setTimeout(() => handleClose(), 1000)
      } else {
        setAnimate(false);
        alert("Error");
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
            monto: ''
          }}
          validate={(valores) => {
            let errores = {};
            let dias = Math.round((Date.now() - Date.parse(valores.fecha)) / (1000 * 60 * 60 * 24));

            if (!valores.monto) {
              errores.monto = ('Por favor ingrese un monto')
            } else if (isNaN(valores.monto)) {
              errores.monto = ('Por favor, ingrese un monto numérico')
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
                <label htmlFor="monto">Monto esperado</label>
                <input className="mb-3" controlId="formMetaFecha"
                  type="Integer"
                  id="monto"
                  name="monto"
                  placeholder="Ingrese el monto esperado"
                  value={values.monto}
                  onChange={handleChange}
                  onBlur={handleBlur}
                />
                {touched.monto && errors.monto && <div style={{ color: 'red' }}>{errors.monto}</div>}
              </div>
              <div>
                <button className="btn btn-primary" type="submit">Cargar data indicador</button>
                {formularioEnviado && <p style={{ color: 'green' }}>Data cargada con éxito!</p>}
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
        Cargar data indicador
      </Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton></Modal.Header>
        <Modal.Body>
          <IndicatorDataModal />
        </Modal.Body>
      </Modal>
    </>
  );
};
export default IndicatorDataButton;
