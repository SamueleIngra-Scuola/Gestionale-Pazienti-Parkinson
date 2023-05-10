import express from "express";
const patients = require("./patients.api");
var app = express();

app.use("/patient", patients);