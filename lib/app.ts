
import * as express from "express";
import * as bodyParser from "body-parser";

//------Call the Routes----
//import * as appConfig from "./common/app-config";
import { Routes } from "./routes/userRoutes";




class App {

    public app: express.Application;
    //-------------Routes----
    public routePrv: Routes = new Routes();
   //-------------Database Url

    constructor() {
        this.app = express();
        this.config();  
        //-- App
        this.routePrv.routes(this.app);    

    }

    private config(): void{
       this.app.use(bodyParser.json());
       this.app.use(bodyParser.urlencoded({ extended: false }));
    }

    

  
    

}

export default new App().app;