// /lib/routes/routeRoutes.ts
import { Request, Response } from "express";
import { UserController } from "../controllers/UserController";

export class Routes {

  public userController: UserController = new UserController();

  public async  routes(app): Promise<void> {



    app.route('/insertUserDetail').post(this.userController.insertUserDetail);
    app.route('/loginAuthentication').post(this.userController.loginAuthentication);


  }
}