import React, {useState} from "react";
import { Formik } from "formik";

const FormMeta = () => {
    const [formularioEnviado, cambiarFormularioEnviado] = useState(false);
    return (
        <>
            <Formik
                initialValues={{
                    eje: '',
                    subeje: '',
                    monto: '',
                    fecha:''
                }}
                validate={(valores)=>{
                    let errores = {};
                    let dias = Math.round((Date.now() - Date.parse(valores.fecha)) / (1000 * 60 * 60 * 24));

                    if(!valores.eje){
                        errores.eje = ('Por favor ingrese un eje')
                    }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.eje)){
                        errores.eje = ('El eje solo puede contener letras y espacios')
                    }
                    if(!valores.subeje){
                        errores.subeje = ('Por favor ingrese un subeje')
                    }else if(!/^[a-zA-ZÀ-ÿ\s]{1,40}$/.test(valores.subeje)){
                        errores.subeje = ('El subeje solo puede contener letras y espacios')
                    }
                    if(!valores.monto){
                        errores.monto = ('Por favor ingrese un monto')
                    }
                    if(!valores.fecha){
                        errores.fecha = ('Por favor ingrese una fecha')
                    }else if(dias>0){
                        errores.fecha = ('Por favor ingrese una fecha posterior a la actual')
                    }
                    return errores;
                }}
                onSubmit={(valores, {resetForm}) => {
                    resetForm();
                    console.log("Formulario enviado")
                    cambiarFormularioEnviado(true)
                    setTimeout(()=>cambiarFormularioEnviado(false),5000)
                }}
            >
                {({ values, errors,handleSubmit, handleChange, handleBlur, touched}) => (
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
                            {touched.eje && errors.eje && <div className="error">{errors.eje}</div>}
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
                            {touched.subeje && errors.subeje && <div className="error">{errors.subeje}</div>}
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="monto">Monto esperado</label>
                            <input
                                type="number"
                                id="monto"
                                name="monto"
                                placeholder="Ingrese el monto esperado"
                                value={values.monto}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.monto && errors.monto && <div className="error">{errors.monto}</div>}
                        </div>
                        <div className="row mb-3">
                            <label htmlFor="fecha">Fecha</label>
                            <input
                                type="date"
                                id="fecha"
                                name="fecha"
                                placeholder="Ingrese una fecha"
                                value={values.fecha}
                                onChange={handleChange}
                                onBlur={handleBlur}
                            />
                            {touched.fecha && errors.fecha && <div className="error">{errors.fecha}</div>}
                        </div>
                        <div>
                            <button className="btn btn-primary" type="submit">Crear meta</button>
                            {formularioEnviado && <p className="exito">Meta cargada con éxito!</p>}
                        </div>
                    </form>

                )}
            </Formik>
        </>
    );
}

export default FormMeta;