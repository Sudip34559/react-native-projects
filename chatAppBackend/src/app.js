import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(
  cors({
    origin: "*", // replace with your domain
    credentials: true,
  })
);

app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

// Import routes
import userRouter from "./routes/user.route.js";
import employeeRouter from "./routes/employee.route.js";

app.use("/api/v1/user", userRouter);
app.use("/api/v1/employee", employeeRouter);

export { app };
