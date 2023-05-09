import express from "express";
const patients = require("./patients");
var app = express();

app.use("/patient", patients);