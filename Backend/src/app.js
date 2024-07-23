import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
const app = express();

app.use(cors({
    origin:'https://collabdocsbyanubhav.vercel.app',
}));
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());

//router
import USerRoute from "./routes/User.routes.js";
import DocumentRoutes from "./routes/Document.routes.js";
import {HealthCheck} from "./controllers/HealthCheck.controller.js";

app.use("/api/v1/user",USerRoute);
app.use("/api/v1/document",DocumentRoutes);
app.get("/api/v1/health",HealthCheck);

export { app };