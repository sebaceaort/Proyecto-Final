import { Table, Button } from "react-bootstrap";
// import { useState, useEffect } from "react";
// import authApi from "../../services/authApi";
// import Graph from "../../components/graph";
import { useHistory } from "react-router-dom";

export default function Historical() {
 // const [historical, setHistorical] = useState([]);
  const history = useHistory()

  //   useEffect(() => {
  //     async function getUsers() {
  //       const disabledUsers = await authApi.getDisabledUsers();
  //       setUsers((oldUsers) => [...oldUsers, disabledUsers]);
  //     }
  //     getUsers();
  //   }, []);

  return (
    <>
      <Button onClick={() => {history.push("/show-graph")}}>Ver grafico</Button>
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
          {/* {users[0]?.map((user, i) => { */}
          {/* return ( */}
          <tr>
            <td>1</td>
            <td>Accesibilidad</td>
            <td>Accesibilidad</td>
            <td>Transporte público accesible</td>
            <td>5%</td>
            <td>2021-10-15</td>
            <td>25%</td>
            <td>2022-02-20</td>
          </tr>
          <tr>
            <td>2</td>
            <td>Accesibilidad</td>
            <td>Accesibilidad</td>
            <td>Transporte público accesible</td>
            <td>8%</td>
            <td>2021-10-22</td>
            <td>25%</td>
            <td>2022-02-20</td>
          </tr>
          <tr>
            <td>3</td>
            <td>Seguridad</td>
            <td>Seguridad Ciudadana</td>
            <td>Delitos contra la persona</td>
            <td>23%</td>
            <td>2021-10-25</td>
            <td>35%</td>
            <td>2022-02-20</td>
          </tr>
          {/* ); */}
          {/* })} */}
        </tbody>
      </Table>
    </>
  );
}
