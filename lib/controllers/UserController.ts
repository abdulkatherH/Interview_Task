
import { Request, Response } from 'express';
import { UserDTO } from '../dto/UserDTO';
import { UserDAO } from '../dao/UserDAO';
import { pool } from 'common/app-config';
import { isEmpty } from 'lodash';
import CryptoJS = require("crypto-js");

export class UserController {


    public async  insertUserDetail(req: Request, res: Response) {
        try {

            let userDTO = new UserDTO();
            //------body--Parse----
            userDTO.firstName = req.body.firstName;
            userDTO.lastName = req.body.lastName;
            userDTO.email = req.body.email;
            userDTO.password = req.body.password;
            let userDAO = new UserDAO();
            let createDataStatus = await userDAO.inserUserDAO(userDTO);
            if (createDataStatus === 1) {
                res.status(200).json({ message: "User Created Successfully" });

            } else if (createDataStatus === 2) {
                res.status(404).json({ message: "Insert  Failed" });
            } else if (createDataStatus === 3) {
                res.status(409).json({ message: "Email Id  Already Exit" });
            }
        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

    public async loginAuthentication(req: Request, res: Response) {
        try {

            let userDTO = new UserDTO();
            //------body--Parse----          
            let userDAO = new UserDAO();
            userDTO = await userDAO.loginAuthenticationDAO(req.body.email, req.body.password);
            if (!isEmpty(userDTO)) {
                res.status(200).json({ data: userDTO, message: "Successfully Login" });
            }
            else {

                res.status(400).json({ message: "Invalid Login" });
            }

        } catch (error) {
            res.status(500).json({ message: "Internal Server Error" });
        }
    }

}