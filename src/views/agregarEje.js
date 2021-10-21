import React from "react";

import { Formik,  Field, FieldArray } from "formik";




const Colors = ({ subEje, name }) => (
    <FieldArray
        name={name}
        render={arrayHelpers => (
            <div style={{ marginTop: "16px" }}>
                <button
                 className = "btn btn-primary" 
                    style={{ marginBottom: "8px" }}
                    type="button"
                    onClick={() => arrayHelpers.insert(subEje.indicadores.length, "")} // insert an empty string at a position
                >
                    Añadir indicador
                </button>
                {(
                    subEje.indicadores.map((indicador, index) => (
                        <div key={index} style={{ marginTop: "8px" }}>
                            <label className = "h3" htmlFor="indicador">Indicador {index + 1}  &emsp;</label>
                            
                            <button
                            className = "h5"
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a indicador from the list
                            >
                                X
                            </button>
                            <br /><br />
                            <label  className = "col-sm-2 h4" htmlFor="indicadorNombre"> Nombre: </label>
                            <Field  className = "col-sm-2 fs-4" name={`${name}.${index}.indicador`} />
                            <br /><br /><br />
                            <label className = "col-sm-2 h4"  htmlFor="indicadorDescripcion"> Descripcion: </label>
                            <Field  className = "col-sm-2 fs-4" name={`${name}.${index}.description`} />
                            <br /><br /><br />
                            <label  className = "col-sm-2 h4" htmlFor="indicadorTipo"> Tipo de dato: </label>
                            <Field  className = "col-sm-2 fs-4" name={`${name}.${index}.type`} />
                            <br /><br /><br />
                           

                        </div>
                    ))
                )}
            </div>
        )}
    />
);

const Basic = () => (
    <div>
        <h1 className = "text-center fw-bold display-4">Agregando Ejes</h1>
        <br/><br/>
        <Formik
            initialValues={{
                eje: "nombre",
                subEjes: [
                    { name: "Subeje1", isActive: true, indicadores: [{ indicador: "placeholder", description: "placeholder", type: "placeholder" }] },
                    { name: "Subeje2", isActive: true, indicadores: [{ indicador: "placeholder", description: "placeholder", type: "placeholder" }] }
                ]
            }}
            validate={values => {
                let errors = {};
                if (!values.eje) {
                    errors.eje = "Required";
                }
                return errors;
            }}
            onSubmit={(values, { setSubmitting }) => {
                setTimeout(() => {
                    alert(JSON.stringify(values, null, 2));
                    console.log(JSON.stringify(values, null, 2))
                    setSubmitting(false);
                }, 400);
            }}
        >
            {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting
                /* and other goodies */
            }) => {
                return (
                    <form onSubmit={handleSubmit}>
                        <div >
                        <label className="col-sm-2 h1"  htmlFor="eje"> Eje: </label>
                        <input
                            className="col-sm-2 fs-1"
                            type="eje"
                            name="eje"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.eje}

                        />
                        {errors.eje && touched.eje && errors.eje}
                        </div>
                        <br/><br/><br/>
                        <FieldArray
                            name="subEjes"
                            render={arrayHelpers => (
                                <div >

                                    {values.subEjes && values.subEjes.length > 0 ? (
                                        values.subEjes.map(
                                            (subEje, index) =>
                                                !subEje.isActive ? null : (
                                                    <div  key={index} style={{ marginTop: "24px" }}>
                                                        <label className="col-sm-2 h2"  htmlFor="subeje">SubEje {index + 1} </label>
                                                        <Field className="col-sm-2 fs-4" name={`subEjes.${index}.name`} />
<span>&ensp;</span>
                                                        <button
                                                        className="h3"
                                                            type="button"
                                                            onClick={() => arrayHelpers.remove(index)} // remove a subEje from the list
                                                        >
                                                            -
                                                        </button>
                                                        <button
                                                        className="h3"
                                                            type="button"
                                                            onClick={() =>
                                                                arrayHelpers.insert(index, {
                                                                    name: "",
                                                                    isActive: true,
                                                                    indicadores: []
                                                                })
                                                            } // insert an empty string at a position
                                                        >
                                                            +
                                                        </button>
                                                        <Colors
                                                            name={`subEjes.${index}.indicadores`}
                                                            subEje={subEje}
                                                        />
                                                    </div>
                                                )
                                        )
                                    ) : (
                                        <button
                                            type="button"
                                            onClick={() =>
                                                arrayHelpers.push({
                                                    name: "",
                                                    isActive: true,
                                                    indicadores: []
                                                })
                                            }
                                        >
                                            {/* show this when user has removed all subEjes from the list */}
                                            Agregar SubEje
                                        </button>
                                    )}
                                    <div>
                                        <button type="submit">Submit</button>
                                    </div>
                                </div>
                            )}
                        />
                    </form>
                );
            }}
        </Formik>
    </div>
);

function Formulario() {
    return (
        <div className="Formulario">
            <h1 className = "text-center fw-bold display-2">Administrador</h1>
            <Basic />
        </div>
    );
}
//     const rootElement = document.getElementById("root");
// ReactDOM.render(<Formulario />, rootElement);



export default Formulario;
