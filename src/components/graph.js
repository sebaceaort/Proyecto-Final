import React from "react";
import { useState, useEffect } from "react";
import { Radar } from "react-chartjs-2";
import fiwareApi from "../services/fiwareApi";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const DoughnutChart = () => {
  const [ejes, setEjes] = useState([]);
  const [subEjes, setSubEjes] = useState([]);
  const [kpi, setKpi] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datos, setDatos] = useState([]);

  useEffect(() => {
    async function getData() {
      const datos = await fiwareApi.getGraphLabels("urn:ngsi-ld:Municipio:1");
      setEjes(datos);
    }
    getData();
  }, []);

  useEffect(() => {
    ejes.forEach(async (eje) => {
      await fiwareApi.getGraphSubEjes(eje.id).then((res) => setSubEjes(res));
    });
  }, [ejes]);

  useEffect(() => {
    async function getKpi() {
      subEjes.forEach(async (subEje) => {
        console.log("for");
        await fiwareApi
          .getGraphData(subEje.id, subEje.refEje)
          .then((res) => setKpi((state) => [...state, res]));
      });
    }
    getKpi();
  }, [subEjes]);

  useEffect(() => {
    function dataFinal(ejes, kpi) {
      const labelandkpi = ejes.map((eje) => {
        let arrAux = [];
        arrAux = kpi.filter((e) => e.refEje === eje.id);
        let total = 0;
        arrAux.forEach((e) => (total += e.kpi));
        const kpiFinal = total / arrAux.length;
        return { label: eje.label, kpi: kpiFinal };
      });
      console.log(labelandkpi);
      return labelandkpi;
    }
    const dataFin = dataFinal(ejes, kpi);
    setLabels(dataFin.map((e) => e.label));
    setDatos(dataFin.map((e) => e.kpi));
  }, [ejes, kpi]);

  console.log(ejes);
  console.log(subEjes);
  console.log(kpi);

  const data = {
    labels: labels,

    datasets: [
      {
        label: "# Cumplimiento de metas por eje ",
        data: datos,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)",
          "rgba(54, 162, 235, 0.2)",
          "rgba(255, 206, 86, 0.2)",
          "rgba(75, 192, 192, 0.2)",
          "rgba(153, 102, 255, 0.2)",
          "rgba(255, 159, 64, 0.2)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <>
     <DropdownButton
                title="Tipo de Grafico"
                align="end"
                id="dropdown-menu"
              
              >
                <Dropdown.Item eventKey="Radar">Radar</Dropdown.Item>
                <Dropdown.Item eventKey="Bar">Barras</Dropdown.Item>
                <Dropdown.Item eventKey="Linea">Linea</Dropdown.Item>
                <Dropdown.Item eventKey="Monto">Monto</Dropdown.Item>
      </DropdownButton>
      <div>
        <div className="header">
          <h1 className="title text-center">Indicadores</h1>
          <div className="links text-center">
            <a
              className="btn btn-gh"
              href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Radar.js"
            >
              Ciudades del futuro
            </a>
          </div>
        </div>
        <div style={{ height: "75%", width: "75%" }}>
          <Radar data={data} />
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
