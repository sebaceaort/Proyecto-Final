const api = process.env.REACT_APP_MONGO_URL_DEV

async function getEntities() {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"))

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
  myHeaders.append("Authorization", window.localStorage.getItem("token"))

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
  myHeaders.append("Authorization", window.localStorage.getItem("token"))

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

async function postEntity(datos, tipo, id) {

  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"))

  var myBody = {
    name: datos.nombre,
    type: tipo,
  }
  if (id) {
    myBody.id = id
  }
  if (tipo == "Indicator") {
    myBody.descripcion = datos.descripcion;
    myBody.tipoDato = datos.tipoDato    
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
    })
    .catch((err) => console.log(err));

  return resp;
}
//eslint-disable-next-line
export default { getEntities, getDataByQuery, getDataByType, postEntity };
