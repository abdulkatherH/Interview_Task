
import {UserDTO} from "../dto/./UserDTO";


export interface ServiceImp{

      inserUserDAO(userDTO:UserDTO):Promise<number>;
      getUserListDAO():Promise<UserDTO[]>;
      updateUserDAO(userDTO:UserDTO):Promise<boolean>;
      removeUserDAO(userId:number):Promise<boolean>;
      loginAuthenticationDAO(emailId:string,password:string):Promise<UserDTO>;
      getUserByIdDAO(userId:number):Promise<UserDTO>;
      getUserByEmailDAO(emailId:string):Promise<UserDTO[]>;
      


}