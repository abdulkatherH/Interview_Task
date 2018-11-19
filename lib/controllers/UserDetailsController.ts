import { Request, Response } from 'express';
import * as bodyParser from "body-parser";
import { ServiceImp } from "../service/./ServiceImp";
import { UserDTO } from "../dto/./UserDTO";
import { UserDAO } from "../dao/./UserDAO";
import { validate } from "class-validator";

import { error } from 'util';

 


const controllerName = "userController";

let dao = new UserDAO();
 

export class UserDetailsController {
   
    //-----------insert User Details
    public async  insertUserDetail(req: Request, res: Response) {

        console.log("+++++Enter into insertUserDetails+++++", controllerName);
        try {

            let userDetailsDTO = new UserDTO();
            //------body--Parse----
            userDetailsDTO.firstName = req.body.firstName;
            userDetailsDTO.lastName = req.body.lastName;
            userDetailsDTO.email = req.body.email;
            userDetailsDTO.password = req.body.password;
            let confirmPassword = req.body.confirmPassword;
           
        
         //   let regexp = new RegExp('/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/');
         //regexp.test(userDetailsDTO.email)
             
            //-----Validation----
            validate(userDetailsDTO).then(error => {
                if (error.length > 0) {
                    console.log("validation failed. errors: ", error);
                    res.status(404).json({ error: error[0].constraints });
                }
               
                if(confirmPassword !=  userDetailsDTO.password)
                {
                    res.status(404).json({error: "Confirm Password is not equal to Password" });
                }
            });

            let resultDTO = new UserDTO();
            //------Calling DAO Function

            //----Check Email              
            /*let mailDTOresult = new UserDTO();  
            mailDTOresult = await dao.getUserByEmailDAO(userDetailsDTO.email.trim());
            console.log("---result Controller-----",mailDTOresult);
            if(Object.keys(mailDTOresult).length > 0){
                res.status(404).json({

                    message: 'Duplicate Entry of Email'

                });
            }else{*/
                resultDTO = await dao.inserUserDAO(userDetailsDTO);
                console.log(resultDTO);
    
    
                //---Check Status
    
                if (Object.keys(resultDTO).length > 0) {
                    // console.log("---Success--",resultDTO);
                    res.status(201).json({
                        message: 'User created successfully!',
                        createUsers: {
                            firstName: resultDTO.firstName,
                            lastName: resultDTO.lastName,
                            id: resultDTO.id,
                            request: {
                                type: 'POST',
                                url: "http://localhost:3000/" + resultDTO.id
                            }
                        }
                    });
                } else {
                    res.status(500).json({
                        message: 'Unhandle Request'
                    });
                }
                
           // }

           

        } catch (err) {

            console.log("!!!!!Error occurrs insertUserDetails()!!!!", controllerName + err.stack);
            res.status(500).json({ error: err });
        }


        console.log("+++++Exit into insertUserDetails+++++", controllerName);
    }

    //-----getUserList
    public async getUserList(req: Request, res: Response) {

        console.log("+++++Enter into getUserList+++++", controllerName);

        try {

            let checkResult = await dao.getUserListDAO();
            console.log("Result", checkResult);
            if (Object.keys(checkResult).length > 0) {
                console.log("Success");

                res.status(200).json(checkResult);

            } else {
                console.log("Fail");
                res.status(500).json({

                    message: 'Empty user List'

                });
            }


        } catch (err) {

            console.log("!!!!!Error occurrs getUserList()!!!!", err.stack);

        }
        console.log("+++++Exit into getUserList+++++", controllerName);
    }

    //---Updation

    public async updateUser(req: Request, res: Response) {

        console.log("+++++Enter into updateUserDetails+++++", controllerName);
        console.log("---------" + req.params.id);

        try {

            let userDetailsDTO = new UserDTO();
            //------body--Parse----
            userDetailsDTO.id = req.params.id;
            userDetailsDTO.firstName = req.body.firstName;
            userDetailsDTO.lastName = req.body.lastName;
            userDetailsDTO.email = req.body.email;
            userDetailsDTO.password = req.body.password;            
            userDetailsDTO.country = req.body.country;
            userDetailsDTO.gender = req.body.gender;
            userDetailsDTO.work = req.body.work;
            userDetailsDTO.aboutYou = req.body.aboutYou;

            //--Validation  
            validate(userDetailsDTO).then(error => {
                if (error.length > 0) {
                    console.log("validation failed. errors: ", error);
                    res.status(500).json({ error: error[0].constraints });
                }
                
                
            });


            //----Call DTO
            let resultDTO = new UserDTO();
            
            let mailDTOresult = new UserDTO();  
            mailDTOresult = await dao.getUserByEmailDAO(userDetailsDTO);
            console.log("---result Controller-----",mailDTOresult);
            
            if(Object.keys(mailDTOresult).length > 0){
                res.status(404).json({

                    message: 'Duplicate Entry of Email'

                });
            }else{
            //Calling Dao
            resultDTO = await dao.updateUserDAO(userDetailsDTO);

            if (Object.keys(resultDTO).length > 0) {
                console.log("Success");

                res.status(201).json({
                    message: 'User Updated successfully!',
                    updateUsers: {
                        firstName: resultDTO.firstName,
                        lastName: resultDTO.lastName,
                        id: resultDTO.id,
                        request: {
                            type: 'PUT',
                            url: "http://localhost:3000/" + resultDTO.id
                        }
                    }
                });

            } else {
                console.log("Fail");
                res.status(500).json({

                    message: 'Updation Failed'

                });
            }
         }
      } catch (err) {
            console.log("!!!!!Error occurrs updateUserDetails()!!!!", controllerName);
        }

        console.log("+++++Exit into updateUserDetails+++++", controllerName);

    }

    public async removeUser(req: Request, res: Response) {
        try {
            console.log("+++++Exit into removeUserDetail+++++", controllerName);
            console.log("---------" + req.params.id);
            let userDetailsDTO = new UserDTO();
            //------URL Param----
            userDetailsDTO.id = req.params.id;
            let resultDTO = new UserDTO();
            //------Calling Dao
            resultDTO = await dao.removeUserDAO(userDetailsDTO);
            console.log(Object.keys(resultDTO).length)
            if (Object.keys(resultDTO).length > 0) {

                res.status(200).json({
                    message: 'User Id deleted',
                    request: {
                        type: 'DELETE',
                        url: 'http://localhost:3000/' + resultDTO.id

                    }
                })
            } else {

                res.status(500).json({

                    message: "Unable to Find User Id"

                });
            }

        } catch (err) {
            console.log("!!!!!Error occurrs removeUserDetail()!!!!", err.stack);
        }
        console.log("+++++Exit into removeUserDetail+++++", controllerName);

    }


    public async loginAuthentication(req: Request, res: Response) {

        console.log("+++++Enter into loginAuthentication+++++", controllerName);
        try {
            let userDetailsDTO = new UserDTO();
            //------body--Parse----
           console.log("-----", req.body.email);
            userDetailsDTO.email = req.body.email;
            userDetailsDTO.password = req.body.password;
           
          /*   if(userDetailsDTO.email=="" || userDetailsDTO.password )
             {
                res.status(500).json({error: "Email is not Empty or null" });
             }
             if(userDetailsDTO.password=="" || userDetailsDTO.password== null ){
                res.status(500).json({error: "Password is not Empty or null" });
             }
        */


            //----Call DTO
            let resultDTO: any = new UserDTO();
            //Calling Dao
            resultDTO = await dao.loginAuthenticationDAO(userDetailsDTO);

            if (Object.keys(resultDTO).length > 0) {
                console.log("Success");

                res.status(201).json({
                    message: 'Login Authenticated successfully!',
                    loginUser: {
                        firstName: resultDTO.firstName,
                        lastName: resultDTO.lastName,

                        request: {
                            type: 'POST',
                            url: "http://localhost:3000/" + resultDTO.email
                        }
                    }
                });

            } else {
                console.log("Fail");
                res.status(500).json({

                    message: 'Invalid Email and Password'

                });
            }

        } catch (err) {
            console.log("!!!!!Error occurrs removeUserDetail()!!!!", err.stack);
        }
        console.log("+++++Exit into loginAuthentication+++++", controllerName);

    }

    public async getUserById(req: Request, res: Response) {
        console.log("+++++Exit into getByUserId+++++", controllerName);
        try {

            console.log("---------" + req.params.id);
            let userDetailsDTO = new UserDTO();
            //------URL Param----
            userDetailsDTO.id = req.params.id;
            let resultDTO = new UserDTO();
            //--Call DAO
            resultDTO = await dao.getUserByIdDAO(userDetailsDTO);
            console.log("---xxx----" + Object.keys(resultDTO).length)

            if (Object.keys(resultDTO).length > 0) {
                console.log("Success");

                res.status(201).json(resultDTO);
            } else {
                console.log("Fail");
                res.status(500).json({

                    message: 'Unable to Find User Id ' + req.params.id

                });
            }

        } catch (err) {
            console.log("+++++Error into getByUserId+++++", controllerName);
        }
        console.log("+++++Exit into getByUserId+++++", controllerName);

    }




}