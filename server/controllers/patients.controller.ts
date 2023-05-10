const patients = require("../../imports/api/v1/patients");
import { Request, Response } from "express";



/**
 * 
 * @param {Request} req 
 * @param {Response} res 
 */
export var CreatePatientAccount = (req: Request, res: Response) => {
    const { email, password, profile } = req.body;
    Accounts.createUser({
        email,
        password,
        profile,
    }, (err) => {
        if (err) {
        res.status(400).send(err.message);
        } else {
        res.sendStatus(200);
        }
    });
}

module.exports = {
    CreatePatientAccount,
}
    
