const api = process.env.REACT_APP_MONGO_URL_DEV;

async function login(usr, pass) {
  let user = "";

  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  var raw = JSON.stringify({
    usEmail: usr,
    usPasswordHash: pass,
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  await fetch(`${api}/users/login`, requestOptions)
    .then((response) => response.json())
    .then((res) => {
      user = res.user;
      if (user.usActive) {
        window.localStorage.setItem("token", res.token);
      }
    })
    .catch((error) => {
      throw new Error(error);
    });
  return user;
}

async function addUser(usr, name, lastname, pass, role, muni) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");

  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var raw = JSON.stringify({
    usEmail: usr,
    usName: name,
    usLastName: lastname,
    usPasswordHash: pass,
    usActive: false,
    usRole: role,
    usMunicipio: muni
  });

  var requestOptions = {
    method: "POST",
    headers: myHeaders,
    body: raw,
    redirect: "follow",
  };

  fetch(`${api}/users`, requestOptions)
    .then((result) => {
      console.log(result);
      alert("Usuario Creado con exito!");
      window.location.reload();
    })
    .catch((error) => console.log("error", error));
}

async function getDisabledUsers() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));
  let dUsers = [];
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  await fetch(`${api}/users/disabled`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      dUsers = result;
    })
    .catch((error) => console.log("error", error));

  return dUsers;
}

async function updateUsers(userId) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    redirect: "follow",
  };

  await fetch(`${api}/users/enable/` + userId, requestOptions)
    .then((response) => response.json())
    .then((result) => console.log(result))
    .catch((error) => console.log("error", error));
}

async function getRoles() {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));
  let roles = [];
  var requestOptions = {
    method: "GET",
    redirect: "follow",
    headers: myHeaders,
  };

  await fetch(`${api}/roles`, requestOptions)
    .then((response) => response.json())
    .then((result) => {
      roles = result;
    })
    .catch((error) => console.log("error", error));

  return roles;
}

async function changePassword(userEmail, valores) {
  let resp;
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/json");
  myHeaders.append("Accept", "application/json");
  myHeaders.append("Authorization", window.localStorage.getItem("token"));

  var myBody = {
    email: userEmail,
    password: valores.password,
    newPassword: valores.newPassword,
  };

  var requestOptions = {
    method: "PUT",
    headers: myHeaders,
    body: JSON.stringify(myBody),
    redirect: "follow",
  };

  await fetch(`${api}/users/change/password/`, requestOptions)
    .then((response) => {
      console.log(response)
      resp = response})
    .catch((error) => {
      console.log("entró al catch")
      throw new Error(error.message)});

  return resp;
}

//eslint-disable-next-line
export default {
  login,
  addUser,
  getDisabledUsers,
  updateUsers,
  getRoles,
  changePassword,
};
