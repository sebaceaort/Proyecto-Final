import React from "react";
import { Line } from "react-chartjs-2";

const data = {
  labels: ["Accesibilidad","Seguridad", "Gobernanza", "Innovacion", "Movilidad", "Promocion", "Marketing", "Sustentabilidad", "Tecnologia", "Creatividad"],
  datasets: [
    {
      label: "# Cumplimiento de metas por eje ",
      data: [12, 19, 3, 5, 2, 3,7,8,4,100],
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

const DoughnutChart = () => (
  <>
    <div>
      <div className="header">
        <h1 className="title text-center">Indicadores</h1>
        <div className="links text-center">
          <a
            className="btn btn-gh"
            href="https://github.com/reactchartjs/react-chartjs-2/blob/master/example/src/charts/Doughnut.js"
          >
            Ciudades del futuro
          </a>
        </div>
      </div>
      <div style={{ height: "100%", width: "100%" }}>
        <Line data={data} />
      </div>
    </div>
  </>
);

export default DoughnutChart;
