import { Table, Button } from "react-bootstrap";
<<<<<<< HEAD

// import authApi from "../../services/authApi";
=======
import { useState, useEffect } from "react";
import fiwareApi from "../../services/fiwareApi";
>>>>>>> b0b5b1491ebea3bcba64ae167f23634fb9f6cabb
// import Graph from "../../components/graph";
import { GoGraph } from "react-icons/go";
import { useHistory } from "react-router-dom";

export default function Historical() {
<<<<<<< HEAD
  
  const history = useHistory();
=======
  const [historical, setHistorical] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getHistorical() {
      const historicalData = await fiwareApi.getHistoricalData();
      setHistorical((oldHistorical) => [...oldHistorical, historicalData]);
    }
    getHistorical();
  }, []);
>>>>>>> b0b5b1491ebea3bcba64ae167f23634fb9f6cabb

  return (
    <>
      <Button
        onClick={() => {
          history.push("/show-graph");
        }}
      >
        <GoGraph /> Ver grafico
      </Button>
      <Table striped bordered hover responsive>
        <thead>
          <tr>
            <th>#</th>
            <th>Eje</th>
            <th>Sub Eje</th>
            <th>Indicador</th>
            <th>Valor Indicador</th>
            <th>Fecha Modificacion</th>
            <th>Valor Meta</th>
            <th>Fecha Meta</th>
          </tr>
        </thead>
        <tbody>
          {historical[0]?.map((data, i) => {
            return (
              <tr>
                <td>{i + 1}</td>
                <td>{data.refEje}</td>
                <td>{data.refSubEje}</td>
                <td>{data.indicatorName}</td>
                <td>{data.data}%</td>
                <td>{data.indicatorDate}</td>
                <td>{data.goal}%</td>
                <td>{data.goalDate}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </>
  );
}
