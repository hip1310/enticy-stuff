import express from 'express';
import { Request, Response, NextFunction } from "express";
import cors from "cors";
import userRouter from './api/user/user.route';
import cartRouter from './api/cart/cart.route';
import orderRouter from './api/order/order.route';
import stripeRouter from './api/stripe/stripe.route';
import categoryRouter from './api/category/category.route';
import addressRouter from './api/address/address.route';
import schedulerRouter from './api/scheduler/scheduler.route';
import errorHandler from './exception/error-handler';
import loggerInterceptor from './middleware/loggerMiddleware';

const app = express();

app.use(
  cors({
    origin: ["*"],
    allowedHeaders: ["X-Requested-With, Content-Type, Accept"],
    preflightContinue: true,
  })
);

app.use(express.json());

app.use((req: Request, res: Response, next: NextFunction) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PATCH,DELETE");
  res.setHeader("Access-Control-Allow-Headers", "*");
  next();
});

// Use the logger interceptor middleware
app.use(loggerInterceptor);

app.use("/api/user", userRouter);
app.use('/api/cart', cartRouter);
app.use("/api/order", orderRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/category", categoryRouter);
app.use("/api/address", addressRouter);
app.use("/api/scheduler", schedulerRouter);

app.use(errorHandler);

export default app;
