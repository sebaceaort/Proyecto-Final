import { useState, useEffect, useContext } from "react";
import fiwareApi from "../../services/fiwareApi";
import { UserContext } from "../../context/user-context";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, { dateFilter } from 'react-bootstrap-table2-filter';
import { Loading } from "../../components";

export default function Historical() {
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);

  let idMunicipio = user.usMunicipio;

  async function getHistorical() {
    const historicalData = await fiwareApi.getHistoricalData();

    // const historicalData = await fiwareApi.getHistoricalDataByMunicipio(
    //   idMunicipio
    // );
    setHistorical((oldHistorical) => [...oldHistorical, historicalData]);
    setLoading(true);
  }

  useEffect(() => {
    getHistorical();
  }, []);

  const formatDate = (date) => {
    let dia = date.slice(8, 10);
    let mes = date.slice(5, 7);
    let anio = date.slice(0, 4);

    return dia + "-" + mes + "-" + anio;
  };

  // const dateFilters = dateFilter({
  //   placeholder: 'custom placeholder',  // placeholder for date input
  //   style: { display: 'inline-grid' },  // custom the style on date filter
  //   dateStyle: { backgroundColor: 'cadetblue', margin: '0px' },  // custom the style on date input
  //   dateClassName: 'custom-date-class',  // custom the class on date input
  //   id: 'id', // assign a unique value for htmlFor attribute, it's useful when you have same dataField across multiple table in on
  // })

  let columns = [
    { dataField: "refEje", text: "EJE", sort: true },
    { dataField: "refSubEje", text: "SUB EJE", sort: true },
    { dataField: "indicatorName", text: "INDICADOR", sort: true },
    { dataField: "data", text: "VALOR INDICADOR", sort: true },
    { dataField: "indicatorDate", text: "FECHA MODIFICACION", sort: true},
    { dataField: "goal", text: "META" },
    { dataField: "goalDate", text: "FECHA META", sort: true},
  ];

  // const rowEvents = {
  //   onload: (e, row, rowIndex) => {
  //     console.log(e);
  //     console.log(row);
  //     console.log(rowIndex);
  //   },
  // };

  return (
    <div>
      {loading ? (
        <BootstrapTable
          keyField="_id"
          data={historical[0]}
          columns={columns}
          pagination={paginationFactory()}
          filter={ filterFactory() }
          striped={true}
          bordered={true}
          hover={true}
          condensed={true}
        />
      ) : (
        <Loading />
      )}
    </div>
    // <>
    //   <Table striped bordered hover responsive>
    //     <thead>
    //       <tr>
    //         <th>#</th>
    //         <th>Eje</th>
    //         <th>Sub Eje</th>
    //         <th>Indicador</th>
    //         <th>Valor Indicador</th>
    //         <th>Fecha Modificacion</th>
    //         <th>Valor Meta</th>
    //         <th>Fecha Meta</th>
    //       </tr>
    //     </thead>
    //     <tbody>
    //       {historical[0]?.map((data, i) => {
    //         return (
    //           <tr key={i}>
    //             <td>{i + 1}</td>
    //             <td>{data.refEje}</td>
    //             <td>{data.refSubEje}</td>
    //             <td>{data.indicatorName}</td>
    //             <td className="text-center">{data.data}%</td>
    //             <td className="text-center">
    //               {formatDate(data.indicatorDate)}
    //             </td>
    //             <td className="text-center">{data.goal}%</td>
    //             <td className="text-center">{formatDate(data.goalDate)}</td>
    //           </tr>
    //         );
    //       })}
    //     </tbody>
    //   </Table>

    //   <Pagination>
    //     <Pagination.First />
    //     <Pagination.Prev />
    //     <Pagination.Item>{1}</Pagination.Item>
    //     <Pagination.Ellipsis />

    //     <Pagination.Item>{10}</Pagination.Item>
    //     <Pagination.Item>{11}</Pagination.Item>
    //     <Pagination.Item active>{12}</Pagination.Item>
    //     <Pagination.Item>{13}</Pagination.Item>
    //     <Pagination.Item disabled>{14}</Pagination.Item>

    //     <Pagination.Ellipsis />
    //     <Pagination.Item>{20}</Pagination.Item>
    //     <Pagination.Next />
    //     <Pagination.Last />
    //   </Pagination>
    // </>
  );
}
