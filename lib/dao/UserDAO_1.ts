import { ServiceImp } from "../service/./ServiceImp";
import { UserDTO } from "../dto/./UserDTO";
import { validate } from "class-validator";
import * as appConfig from "../common/./app-config";
import 'reflect-metadata';
import CryptoJS = require("crypto-js");
//import {DatabaseProvider} from '../common/./DatabaseProvider';
import request = require('request-promise');

import { wrap } from "node-mysql-wrapper";
let db = wrap(appConfig.connection);


db.ready(function (err) {
  if (err) {
    console.error('error connecting: ' + err.stack);
    return;
  }
  console.log("***Successfully Connected to DB***");
});



//const connection =   DatabaseProvider.getConnection();

//console.log("------"+connection);
//-------------Routing------

const controllerName = "UserDAO";
export class UserDAO implements ServiceImp {

  //public ListX: Array<UserDTO> = new Array<UserDTO>();

  public async  inserUserDAO(userDTO): Promise<UserDTO> {
    console.log("+++++Enter UserDAO into insertUserDetails+++++", controllerName);

    var hash = CryptoJS.SHA1(userDTO.password);
    var passwordHash = hash.toString(CryptoJS.enc.Hex);
    console.log("----test-----"+passwordHash);

    let insertDTO = new UserDTO();
    insertDTO.firstName = userDTO.firstName;
    insertDTO.lastName = userDTO.lastName;
    insertDTO.email = userDTO.email;
    insertDTO.password = passwordHash;       
   insertDTO.country = userDTO.country;
   insertDTO.gender = userDTO.gender;
   insertDTO.work = userDTO.work;
   insertDTO.aboutYou = userDTO.aboutYou;



    let resultDTO = new UserDTO();
    try {

      var usersDb = db.table<UserDTO>("user_details");
      await usersDb.save(insertDTO).then(result => {

        resultDTO.id = result.id;
        resultDTO.firstName = result.firstName;
        resultDTO.lastName = result.lastName;
        resultDTO.email = result.email;
     /*  // resultDTO.password = result.password;       
        resultDTO.country = result.country;
        resultDTO.gender = result.gender;
        resultDTO.work = result.work;
        resultDTO.aboutYou = result.aboutYou;*/

        console.log(resultDTO);

        return resultDTO = result;
      })
    } catch (err) {
      console.log("!!!!!Error UserDAO occurrs insertUserDetails()!!!!", controllerName);
      console.log(err);

    }

    console.log("+++++Exit  UserDAO into insertUserDetails+++++", controllerName);
    return resultDTO;
  }

  //----
  public async getUserListDAO() {
    console.log("+++++Exit  UserDAO into insertUserDetails+++++", controllerName)
    try{
      let result;
      result=await db.table("user_details").findAll();
    
      return result;
    }catch(err){
      console.log("!!!!!Error UserDAO occurrs insertUserDetails()!!!!", controllerName);
      console.log(err);
    }
    console.log("+++++Exit  UserDAO into insertUserDetails+++++", controllerName)
   
  }
  //--------------End
  /*public async getDaoUserAll(): Promise<Array<UserDTO>> {
    console.log("+++++Enter into getUserList+++++", controllerName);
    let resultList: Array<UserDTO>;
    try {
      let userDTO = new UserDTO();
      await db.table("user_details").findAll().then(result => {
        console.log("---CheckAJM-", result);
        
        resultList = result;
        
        return result;
      });
      console.log("+++++Exit into getUserList+++++", controllerName);
    } catch (err) {
      console.log("!!!!!Error occurrs getUserList()!!!!", controllerName, err.stack);
      return err.stack;
    }
    return resultList;

  } */

  //---Update
  public async  updateUserDAO(userDTO): Promise<UserDTO> {
    console.log("+++++Enter into DAO updateUserDetails+++++", controllerName);
    let resultDTO = new UserDTO();
    try {

      var usersDb = db.table<UserDTO>("user_details");

      await usersDb.save(userDTO, function () {
        console.log('User was just updated, because we have already a primary key setted at this object');
      }).then(updated => {
        resultDTO.firstName = updated.firstName;
        resultDTO.lastName = updated.lastName;
        resultDTO.id = updated.id
        return resultDTO;
      })
      console.log("+++++Enter into DAO updateUserDetails+++++", controllerName);

    } catch (err) {
      console.log("!!!!!Error occurrs getUserList()!!!!", controllerName, err.stack);
    }
    return resultDTO;
  }

  //---Remove fuunction
  public async  removeUserDAO(userDTO): Promise<UserDTO> {
    console.log("+++++Enter into DAO removeUserDetail+++++", controllerName);
    let resultDTO = new UserDTO();
    try {
      var usersDb = db.table<UserDTO>("user_details");
      await usersDb.remove({ id: userDTO.id }).then(answer => {
        console.log(answer.affectedRows + ' (1) has removed from table:  ' + answer.table);
        console.log("---Result Id----", resultDTO.id);
        if (answer.affectedRows > 0) {
          resultDTO.id = userDTO.id;
        }
        return resultDTO;
      })

    } catch (err) {
      console.log("!!!!!Error occurrs getUserList()!!!!", controllerName, err.stack);
    }
    console.log("+++++Exit into DAO removeUserDetail+++++", controllerName);
    return resultDTO;
  }
  //---loginDAOAuthentication

  public async loginAuthenticationDAO(userDTO: UserDTO) {
    console.log("+++++Enter into loginDaoAuthentication+++++", controllerName);
    let resultDTO = new UserDTO();
    try {
      //var usersDb = db.table<UserDTO>("user_details");   

      console.log("-----" + userDTO.email);

      var hash = CryptoJS.SHA1(userDTO.password);
      var passwordHash = hash.toString(CryptoJS.enc.Hex);
      console.log("input password :"+passwordHash);
      var usersDb = db.table<UserDTO>("user_details");



      await usersDb.findSingle(
        {
          email: userDTO.email,
          password:passwordHash

        }).then(result => {

          console.log(result);

           console.log("-----"+result.email);
          resultDTO.firstName = result.firstName;
          resultDTO.lastName = result.lastName;
          resultDTO.email = result.email;

          console.log("Result from dao", resultDTO);
          return resultDTO;
        });


    } catch (err) {
      console.log("!!!!!Error occurrs loginDaoAuthentication()!!!!", controllerName, err.stack);

    }

    console.log("+++++Exit into loginDaoAuthentication+++++", controllerName);

    return resultDTO;
  }
  //getById
  public async getUserByIdDAO(userDTO: UserDTO) {

    console.log("+++++Enter into getByUserId+++++", controllerName);
    let resultDTO = new UserDTO();
    try {
      var usersDb = db.table<UserDTO>("user_details");
      await usersDb.findSingle(
        {
          id: userDTO.id

        }).then(async function (result) {

          console.log(result);

          resultDTO.id = result.id;
          resultDTO.firstName = result.firstName;
          resultDTO.lastName = result.lastName;
          resultDTO.email = result.email;
          resultDTO.password = result.password;
          
          resultDTO.country = result.country;
          resultDTO.gender = result.gender;
          resultDTO.work = result.work;
          resultDTO.aboutYou = result.aboutYou;
          console.log("Result from dao", resultDTO);
          return resultDTO;
        });

    } catch (err) {
      err.stack;
      console.log("+++++Error into getByDAOUserId+++++", controllerName);
    }
    return resultDTO;
  }


//getUserByEmail
public   async getUserByEmailDAO(userDTO) {

  console.log("+++++Enter into getByUserId+++++", controllerName);
console.log("email: "+userDTO.email);

  let resultDTO = new UserDTO();
  try {
    var usersDb = db.table<UserDTO>("user_details");
    await usersDb.findSingle(
      {
        email: userDTO.email

      }).then(async function(result) {

        console.log(result.email);
           
        //resultDTO.email = result.email;
        return resultDTO;

      });

  } catch (err) {
    err.stack;
    console.log("+++++Error into getByDAOUserId+++++", controllerName +err.stack);
  }

  return resultDTO;
}



}
