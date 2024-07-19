import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors());
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//router
import USerRoute from "./routes/User.routes.js";
import DocumentRoutes from "./routes/Document.routes.js";
import {HealthCheck} from "./controllers/HealthCheck.controller.js";

app.route("/api/v1/user").use(USerRoute);
app.route("/api/v1/document").use(DocumentRoutes);
app.route("/api/v1/health").get(HealthCheck);

export { app };