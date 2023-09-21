import express from "express";
import stripeRouter from "./routes/stripe";
import userRouter from "./routes/user";
import cartRouter from "./routes/cart";
import orderRouter from "./routes/order";
import pkg from "body-parser";
import errorHandler from "./exception/ErrorHandler";
import cors from "cors";
const { json } = pkg;
const app = express();
const port = 8000;

app.use(
  cors({
    origin: ["*"],
    allowedHeaders: ["X-Requested-With, Content-Type, Accept"],
    preflightContinue: true,
  })
);
app.use(json());
app.use((req: any, res: any, next: any) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});
app.use("/api/stripe", stripeRouter);
app.use("/api/user", userRouter);
app.use("/api/cart", cartRouter);
app.use("/api/order", orderRouter);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
