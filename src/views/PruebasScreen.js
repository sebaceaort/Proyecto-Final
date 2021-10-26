import React, { useEffect, useState } from "react";
import { ShowArr } from "../components/ShowArr";
import fiwareApi from "../services/fiwareApi";

export const PruebasScreen = () => {
  const [data, setData] = useState([]);
  useEffect(() => {
    async function getEntities() {
      const entities = await fiwareApi.getDataByType("Municipio");
      setData(entities);
    }
    getEntities();
  }, []);

  return (
    <>
      <h1>seccion de prueba</h1>
      <div className=" d-flex flex-column conteiner-fluid bg-dark w-100 ">
        <ShowArr array={data} />
      </div>
    </>
  );
};
