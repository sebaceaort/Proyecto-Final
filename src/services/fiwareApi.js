const api = process.env.REACT_APP_MONGO_URL

async function getEntities() {
  let arr = [];
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Authorization",window.localStorage.getItem("token"))

  var requestOptions = {
    method: "GET",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/fiware/entities`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      arr = res;
      console.log(res);
    })
    .catch((err) => console.log(err));

  return arr;
}

//eslint-disable-next-line
export default { getEntities };
