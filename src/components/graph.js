import React from "react";
import { useState, useEffect } from "react";
import { Bar, Line, PolarArea, Radar } from "react-chartjs-2";
import fiwareApi from "../services/fiwareApi";
import DropdownButton from "react-bootstrap/DropdownButton";
import Dropdown from "react-bootstrap/Dropdown";

const DoughnutChart = () => {
  const [ejes, setEjes] = useState([]);
  const [subEjes, setSubEjes] = useState([]);
  const [kpi, setKpi] = useState([]);
  const [labels, setLabels] = useState([]);
  const [datos, setDatos] = useState([]);
  const [type, setType] = useState("");

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
      return labelandkpi;
    }
    const dataFin = dataFinal(ejes, kpi);
    setLabels(dataFin.map((e) => {return e.label.length > 13 ? e.label.substring(0,10) :  e.label}));
    setDatos(dataFin.map((e) => e.kpi));
  }, [ejes, kpi]);

  const data = {
    labels: labels,

    datasets: [
      {
        label: "# Cumplimiento de metas por eje ",
        data: [...datos],
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
  const graphType = (type) => {
    switch (type) {
      case "Radar":
        return <Radar data={data} />;
      case "Bar":
        return <Bar data={data} />;
      case "Linea":
        return <Line data={data} />;
      default:
        return <PolarArea data={data} />;
    }
  };
  return (
    <>
      <div className="text-center">
        <DropdownButton
          variant="warning"
          title="Tipo de Grafico"
          align="end"
          id="dropdown-menu"
          onSelect={(tipoDato) => {
            setType(tipoDato);
          }}
        >
          <Dropdown.Item eventKey="Radar">Radar</Dropdown.Item>
          <Dropdown.Item eventKey="Bar">Barras</Dropdown.Item>
          <Dropdown.Item eventKey="Linea">Linea</Dropdown.Item>
          <Dropdown.Item eventKey="Polar">Polar</Dropdown.Item>
        </DropdownButton>
        <div className="header mt-3">
          <h1 className="title text-center">Indicadores</h1>
          <div className="links text-center">
            <h2>Ciudades del futuro</h2>
          </div>
        </div>
        <div className="w-100 d-flex justify-content-center alinght-items-center">
          {type === "radar" ? (
            <div
              className="justify-content-center alinght-items-center"
              style={{ height: "75%", width: "75%" }}
            >
              {graphType(type)}
            </div>
          ) : (
            <div
              className="justify-content-center alinght-items-center"
              style={{ height: "100%", width: "100%" }}
            >
              {graphType(type)}
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default DoughnutChart;
