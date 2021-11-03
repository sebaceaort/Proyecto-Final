import React from "react";
import FormIndicador from "../../components/nuevoIndicador";
import AddGoalButton from "../../components/nuevaMeta";

export default function Indicators() {
  return (
    <>
        <h1>Indicadores</h1>
        <div className="container mt-5">
            <FormIndicador/>
        </div>
        <div className="container mt-5">
            <AddGoalButton/>
        </div>
    </>
  )
}