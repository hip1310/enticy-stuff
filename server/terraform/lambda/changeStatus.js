const https = require("https");

const changeStatus = (defaultOptions, path, payload) =>
  new Promise((resolve, reject) => {
    const options = { ...defaultOptions, path, method: "POST" };
    const req = https.request(options, (res) => {
      let buffer = "";
      res.on("data", (chunk) => (buffer += chunk));
      res.on("end", () => resolve(JSON.parse(buffer)));
    });
    req.on("error", (e) => {
      reject(e.message);
    });
    req.write(payload);
    req.end();
  });

exports.handler = async function (event, context) {
  console.log("EVENT request \n" + JSON.stringify(event));
  // we don't need to explicityly pass stringify because it is already in string format
  const dataString = JSON.parse(event?.Records?.[0]?.body)?.Message;
  console.log("evenet dataString \n", dataString);
  const defaultOptions = {
    host: "enticy-stuff-api.onrender.com", //_hostname : example.com, passed from event as a parameter
    port: 443, // or 80 for http
    headers: {
      "Content-Type": "application/json",
      "Content-Length": dataString.length,
    },
  };

  var response = await changeStatus(
    defaultOptions,
    "/api/order/changeOrderStatus",
    dataString
  );
  console.log("EVENT response \n" + JSON.stringify(response));
  return "Hello from Lambda!";
};
