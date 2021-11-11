import { Table, Pagination } from "react-bootstrap";
import { useState, useEffect } from "react";
import fiwareApi from "../../services/fiwareApi";

export default function Historical() {
  const [historical, setHistorical] = useState([]);

  useEffect(() => {
    async function getHistorical() {
      const historicalData = await fiwareApi.getHistoricalData();
      setHistorical((oldHistorical) => [...oldHistorical, historicalData]);
    }
    getHistorical();
  }, []);

  const formatDate = (date) => {
    let dia = date.slice(8, 10);
    let mes = date.slice(5, 7);
    let anio = date.slice(0, 4);

    return dia + "-" + mes + "-" + anio;
  };

  return (
    <>
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
              <tr key={i}>
                <td>{i + 1}</td>
                <td>{data.refEje}</td>
                <td>{data.refSubEje}</td>
                <td>{data.indicatorName}</td>
                <td className="text-center">{data.data}%</td>
                <td className="text-center">
                  {formatDate(data.indicatorDate)}
                </td>
                <td className="text-center">{data.goal}%</td>
                <td className="text-center">{formatDate(data.goalDate)}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination>
        <Pagination.First />
        <Pagination.Prev />
        <Pagination.Item>{1}</Pagination.Item>
        <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item disabled>{14}</Pagination.Item>

        <Pagination.Ellipsis />
        <Pagination.Item>{20}</Pagination.Item>
        <Pagination.Next />
        <Pagination.Last />
      </Pagination>
    </>
  );
}
