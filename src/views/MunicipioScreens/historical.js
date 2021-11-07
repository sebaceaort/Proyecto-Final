import { Table, Button } from "react-bootstrap";
import { useState, useEffect } from "react";
import fiwareApi from "../../services/fiwareApi";
import { GoGraph } from "react-icons/go";
import { useHistory } from "react-router-dom";

export default function Historical() {
  const [historical, setHistorical] = useState([]);
  const history = useHistory();

  useEffect(() => {
    async function getHistorical() {
      const historicalData = await fiwareApi.getHistoricalData();
      setHistorical((oldHistorical) => [...oldHistorical, historicalData]);
    }
    getHistorical();
  }, []);

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
