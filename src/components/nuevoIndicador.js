import React, { useState } from "react";
import { Formik } from "formik";

const FormIndicador = () => {
  const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
  return (
    <>
      <Formik
        initialValues={{
          eje: "",
          subeje: "",
          indicador: "",
          monto: "",
        }}
        validate={(valores) => {
          let errores = {};

          if (!valores.eje) {
            errores.eje = "Por favor ingrese un eje";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.eje)) {
            errores.eje = "El eje solo puede contener letras y espacios";
          }
          if (!valores.subeje) {
            errores.subeje = "Por favor ingrese un subeje";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.subeje)) {
            errores.subeje = "El subeje solo puede contener letras y espacios";
          }
          if (!valores.indicador) {
            errores.indicador = "Por favor ingrese un indicador";
          } else if (!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.indicador)) {
            errores.indicador =
              "El indicador solo puede contener letras y espacios";
          }
          if (!valores.monto) {
            errores.monto = "Por favor ingrese un monto";
          }
          return errores;
        }}
        onSubmit={(valores, { resetForm }) => {
          resetForm();
          console.log("Formulario enviado");
          cambiarFormularioEnviado(true);
          setTimeout(() => cambiarFormularioEnviado(false), 5000);
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
              <label htmlFor="eje">Eje</label>
              <input
                type="text"
                id="eje"
                name="eje"
                placeholder="Ingrese eje"
                value={values.eje}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.eje && errors.eje && (
                <div className="error">{errors.eje}</div>
              )}
            </div>
            <div className="row mb-3">
              <label htmlFor="subeje">Subeje</label>
              <input
                type="text"
                id="subeje"
                name="subeje"
                placeholder="Ingrese subeje"
                value={values.subeje}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.subeje && errors.subeje && (
                <div className="error">{errors.subeje}</div>
              )}
            </div>
            <div className="row mb-3">
              <label htmlFor="indicador">Indicador</label>
              <input
                type="text"
                id="indicador"
                name="indicador"
                placeholder="Ingrese indicador"
                value={values.indicador}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.indicador && errors.indicador && (
                <div className="error">{errors.indicador}</div>
              )}
            </div>
            <div className="row mb-3">
              <label htmlFor="monto">Monto</label>
              <input
                type="number"
                id="monto"
                name="monto"
                placeholder="Ingrese un monto"
                value={values.monto}
                onChange={handleChange}
                onBlur={handleBlur}
              />
              {touched.monto && errors.monto && (
                <div className="error">{errors.monto}</div>
              )}
            </div>
            <div>
              <button className="btn btn-primary" type="submit">
                Cargar datos del indicador
              </button>
              {formularioEnviado && (
                <p className="exito">Datos cargados con éxito!</p>
              )}
            </div>
          </form>
        )}
      </Formik>
    </>
  );
};

export default FormIndicador;
