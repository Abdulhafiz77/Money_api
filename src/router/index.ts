import * as express from "express";
import { errorHandler } from "../utils";
import { MoneyRoutes } from "./money.routes";
import { UserRoutes } from "./user.routes";
import { HistoryRoutes } from "./history.routes";


function nestedRoutes(this: any, path, configure) {
    const router = express.Router({ mergeParams: true });
    this.use(path, router);
    configure(router);
    return router;
}

express.application['prefix'] = nestedRoutes;
express.Router['prefix'] = nestedRoutes;

const expressRouter = express.Router({ mergeParams: true });

export const routes = (app: express.Application) => {

    expressRouter['prefix']('/api', app => {

        app['prefix']('/user', data => {
            UserRoutes(data)
        });

        app['prefix']('/money', data => {
            MoneyRoutes(data)
        });

        app['prefix']('/value', data => {
            HistoryRoutes(data)
        });

    })

    app.use(expressRouter);
    app.use(errorHandler);
};
