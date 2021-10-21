// const NGSI = require("ngsijs");

// async function postData(eje,subEje,indicator,description,indicatorType) {
//   const connection = new NGSI.Connection("http://192.168.0.107:1026");
// //   const connection = new NGSI.Connection("http://orion.example.com:1026");
// // connection.v2.listEntities().then((response) => {
// //     response.results.forEach((entity) => {
// //         console.log(entity.id);
// //     });
// // });
//   connection.v2
//     .createEntity(
//       {

//         id: `SmartBA-Indicator-`,
//         type: "Indicator",
//         eje: eje,
//         subEje: subEje,
//         indicator: indicator,
//         description: description,
//         indicatorType: indicatorType,
        
//       },
//       { keyValues: true }
//     )
//     .then((res) => {
//       console.log("res ok", res);
//     })
//     .catch((err) => {
//       console.log("Error", err);
//     //   setAnimate(false);
//     });

//   connection.v2.listEntities().then((response) => {
//     response.results.forEach((entity) => {
//       console.log(entity);
//     });
//   });

//   // await fetch("/oauth2/token", requestOptionsPOST)
// }

// export default { postData };
