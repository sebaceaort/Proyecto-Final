import React from "react";
import FormIndicador from "../../components/nuevoIndicador";
import FormMeta from "../../components/nuevaMeta";

export default function Indicators() {
  return (
    <>
        <h1>Indicadores</h1>
        <div className="container mt-5">
            <FormIndicador/>
        </div>
        <div className="container mt-5">
            <FormMeta/>
        </div>
    </>
  )
}