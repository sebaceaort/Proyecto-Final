import { useState, useEffect, useContext } from "react";
import { Button } from "react-bootstrap";
import fiwareApi from "../../services/fiwareApi";
import { UserContext } from "../../context/user-context";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";
import filterFactory, {
  dateFilter,
  textFilter,
  numberFilter,
  Comparator,
} from "react-bootstrap-table2-filter";
import { Loading } from "../../components";

export default function Historical() {
  const [historical, setHistorical] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useContext(UserContext);
  const [showFilters, setShowFilters] = useState(false);

  let idMunicipio = user.usMunicipio;

  useEffect(() => {
    async function getHistorical() {
      const historicalData = await fiwareApi.getHistoricalDataByMunicipio(
        idMunicipio
      );
      setHistorical((oldHistorical) => [...oldHistorical, historicalData]);
      setLoading(true);
    }
    getHistorical();
  }, [idMunicipio]);

  function loadDateFilter() {
    let dateFilters = dateFilter({
      placeholder: "Filtro...",
      delay: 500,
      style: {display: 'inline-grid'},
    });
    return showFilters ? dateFilters : "";
  }

  function loadTextFilter() {
    let textFilters = textFilter({
      placeholder: "Filtro...",
      comparator: Comparator.LIKE,
      caseSensitive: false,
      style: {display: 'inline-grid'},
      delay: 500,
    });
    return showFilters ? textFilters : "";
  }

  function loadNumberFilter() {
    let numberFilters = numberFilter({
      placeholder: "Filtro...",
      delay: 500,
      style: {display: 'inline-grid'},
    });
    return showFilters ? numberFilters : "";
  }

  let columns = [
    { dataField: "refEje", text: "Eje", sort: true, filter: loadTextFilter() },
    {
      dataField: "refSubEje",
      text: "Sub-Eje",
      sort: true,
      filter: loadTextFilter(),
    },
    {
      dataField: "indicatorName",
      text: "Indicador",
      sort: true,
      filter: loadTextFilter(),
    },
    { dataField: "data", text: "Valor indicador", sort: true, filter: loadNumberFilter() },
    {
      dataField: "indicatorDate",
      text: "Fecha modificacion",
      sort: true,
      filter: loadDateFilter(),
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }
        return `${("0" + dateObj.getDate()).slice(-2)}/${(
          "0" +
          (dateObj.getMonth() + 1)
        ).slice(-2)}/${dateObj.getFullYear()}`;
      },
    },
    { dataField: "goal", text: "Meta", filter: loadNumberFilter() },
    {
      dataField: "goalDate",
      text: "Fecha meta",
      sort: true,
      filter: loadDateFilter(),
      formatter: (cell) => {
        let dateObj = cell;
        if (typeof cell !== "object") {
          dateObj = new Date(cell);
        }
        return `${("0" + dateObj.getDate()).slice(-2)}/${(
          "0" +
          (dateObj.getMonth() + 1)
        ).slice(-2)}/${dateObj.getFullYear()}`;
      },
    },
  ];

  return (
    <div>
      {loading ? (
        <>
          <div>
            <Button
              onClick={() => {
                setShowFilters(!showFilters);
              }}
            >
              Activar Filtros
            </Button>
          </div>
          <BootstrapTable
            keyField="_id"
            data={historical[0]}
            columns={columns}
            pagination={paginationFactory()}
            filter={filterFactory()}
            striped
            bordered
            hover
            condensed
            filterPosition="top"
          />
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
