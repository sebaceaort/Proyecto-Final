const api = process.env.REACT_APP_MONGO_URL_DEV;

async function getEntities() {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

async function getDataByType(type) {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities/type/${type}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}
async function getDataByQuery(query) {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities/query/${query}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

async function deleteEntity(tipo, id) {
  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var myBody = {
    type: tipo,
    id: id,
  };

  var requestOptions = {
    method: "DELETE",
    headers: myHeaders,
    body: JSON.stringify(myBody),
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      resp = res;
    });

  return resp;
}

async function postEntity(datos, tipo, id) {
  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var myBody = {
    name: datos.nombre,
    type: tipo,
  };
  if (id) {
    myBody.id = id;
  }
  if (tipo === "Indicator") {
    myBody.descripcion = datos.descripcion;
    myBody.tipoDato = datos.tipoDato;
  }

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: JSON.stringify(myBody),
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities/add`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      resp = res;
    });

  return resp;
}

async function postNewGoal(datos, id) {
  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));
  var myBody = {
    monto: datos.monto,
    fecha: datos.fecha,
    id: id,
  };
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(myBody),
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities/change/goal`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      resp = res;
    })
    .catch((err) => console.log(err));
  return resp;
}

async function loadData(datos, id) {
  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));
  var myBody = {
    actMonto: datos.monto,
    id: id,
  };
  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(myBody),
    redirect: "follow",
  };
  await fetch(`${api}/fiware/entities/load/dataIndicator`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      resp = res;
    })
    .catch((err) => console.log(err));
  return resp;
}
async function updateEntity(datos, id) {
  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  const myBody = { id, ...datos };

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(myBody),
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities/update`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      resp = res;
    });

  return resp;
}

async function getGraphLabels(munId) {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/graph/labels/${munId}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

async function getGraphSubEjes(ejeId) {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/graph/subEjes/${ejeId}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

async function getGraphData(subEjeId, refEje) {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/graph/data/${subEjeId}/${refEje}`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

async function getHistoricalDataByMunicipio(idMunicipio) {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/historical/`+idMunicipio, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

async function getHistoricalData() {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/historical`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
    })
    .catch((err) => console.log(err));

  return arr;
}

//eslint-disable-next-line
export default {
  getEntities,
  getDataByQuery,
  getDataByType,
  getHistoricalData,
  getHistoricalDataByMunicipio,
  postEntity,
  deleteEntity,
  postNewGoal,
  loadData,
  updateEntity,
  getGraphLabels,
  getGraphSubEjes,
  getGraphData,
};
