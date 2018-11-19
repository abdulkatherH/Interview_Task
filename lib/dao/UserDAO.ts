import { ServiceImp } from "../service/ServiceImp";
import { UserDTO } from "../dto/UserDTO";
import { pool } from "../common/app-config";
import CryptoJS = require("crypto-js");

export class UserDAO implements ServiceImp {
    async inserUserDAO(userDTO: UserDTO): Promise<number> {
        try {
            const checkEmailQuery = `SELECT EMAIL FROM USERS WHERE EMAIL=${pool.escape(userDTO.email)}`;
            let emailStatus = await pool.query(checkEmailQuery);
            if (emailStatus.length > 0) {
                return 3;
            } else {
                let hash = CryptoJS.SHA1(userDTO.password);
                let passwordHash = hash.toString(CryptoJS.enc.Hex);
                const createQuery = `INSERT INTO USERS (first_name, last_name, password, email) 
                                     VALUES (${pool.escape(userDTO.firstName)},
                                            ${pool.escape(userDTO.lastName)},
                                            ${pool.escape(passwordHash)},
                                            ${pool.escape(userDTO.email)})`;
                let addUser = await pool.query(createQuery);
                if (addUser.affectedRows === 1) {
                    return 1;
                } else {
                    return 2;
                }
            }
        } catch (error) {
            throw error;
        }
    }

    async getUserListDAO(): Promise<UserDTO[]> {
        try {
            const userListQuery = `SELECT * FROM USERS`;
            let usersList: UserDTO[] = await pool.query(userListQuery);
            return usersList;
        } catch (error) {
            throw error;
        }
    }
    async updateUserDAO(userDTO: UserDTO): Promise<boolean> {
        try {

            return false;

        } catch (error) {
            throw error;
        }

    }
    async removeUserDAO(userId: number): Promise<boolean> {
        try {
            const userDeleteQuery = `DELETE FROM USERS WHERE ID=${pool.escape()}`;
            let deleteStatus = await pool.query(userDeleteQuery);
            if (deleteStatus.afftectedRows === 1) {
                return true;
            } else {
                return false;
            }
        } catch (error) {
            throw error;
        }
    }
    async loginAuthenticationDAO(emailId: string, password: string): Promise<UserDTO> {
        try {
            let hash = CryptoJS.SHA1(password);
            let passwordHash = hash.toString(CryptoJS.enc.Hex);
            const loginAuthenticationQuery = `SELECT * FROM USERS WHERE EMAIL =${pool.escape(emailId)} AND PASSWORD =${pool.escape(passwordHash)}`;
            let userDTO: UserDTO = await pool.query(loginAuthenticationQuery);
            return userDTO;
        } catch (error) {
            throw error;
        }
    }
    async getUserByIdDAO(userId: number): Promise<UserDTO> {
        try {
            const userListQuery = `SELECT FIRST_NAME AS firstName,EMAIL FROM USERS WHERE ID=${pool.escape()}`;
            let userDTO: UserDTO = await pool.query(userId);
            return userDTO;
        } catch (error) {
            throw error;
        }
    }
    async getUserByEmailDAO(emailId: string): Promise<UserDTO[]> {
        throw new Error("Method not implemented.");
    }
}