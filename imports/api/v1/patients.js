import express from "express";
import { CreatePatientAccount } from  "../../../server/controllers/patients.controller";

const app = express();

app.get("/createAccount", CreatePatientAccount);
