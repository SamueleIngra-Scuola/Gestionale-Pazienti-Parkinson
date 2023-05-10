import express from "express";
import { CreatePatientAccount } from  "../../controllers/patients.controller";

const app = express();

app.get("/createAccount", CreatePatientAccount);