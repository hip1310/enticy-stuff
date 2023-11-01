import * as https from "https";
import { Handler } from "aws-lambda";

const changeStatus = (defaultOptions: https.RequestOptions, path: string, payload: string) =>
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

export const handler: Handler = async (event, context) =>{
  console.info("EVENT request \n" + JSON.stringify(event));
  // we need to explicityly pass stringify because it is we are sending body in string format
  const dataString = JSON.parse(event.Records?.[0]?.body)?.Message;
  console.info("evenet dataString \n", dataString);
  const defaultOptions = {
    host: "enticy-stuff-api.onrender.com", //_hostname : example.com, passed from event as a parameter
    port: 443, // or 80 for http
    headers: {
      "Content-Type": "application/json",
      "Content-Length": dataString.length,
    },
  };

  const response = await changeStatus(
    defaultOptions,
    "/api/order/changeOrderStatus",
    dataString
  );
  console.info("EVENT response \n" + JSON.stringify(response));
  return "Hello from Lambda!";
};
