import { Base64 } from "js-base64";

const client_id = process.env.REACT_APP_FIWARE_CLIENT_ID;
const client_secret = process.env.REACT_APP_FIWARE_CLIENT_SECRET;
const b64encoded = Base64.encode(client_id + ":" + client_secret);

let user = "";
async function login(usr,pass) {
  var myHeaders = new Headers();
  myHeaders.append("Content-Type", "application/x-www-form-urlencoded");
  myHeaders.append("Authorization", `Basic ${b64encoded}`);

  var urlencoded = new URLSearchParams();
  urlencoded.append("username", usr);
  urlencoded.append("password", pass);
  urlencoded.append("grant_type", "password");

  var requestOptionsPOST = {
    method: "POST",
    headers: myHeaders,
    body: urlencoded,
    redirect: "follow",
  };

  await fetch("/oauth2/token", requestOptionsPOST)
    .then((response) => response.json())
    .then(async (result) => {
      await fetch("/user?access_token=" + result.access_token)
        .then((response) => response.json())
        .then((result) => {
          user = result;
        })
        .catch((error) => {return error});
    })
    .catch((error) => {return error});
  return user;
}

//eslint-disable-next-line
export default { login };
