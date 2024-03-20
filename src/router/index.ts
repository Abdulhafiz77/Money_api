import * as express from "express";
import { errorHandler } from "..";
import { MoneyRoutes } from "./money.routes";
import { UserRoutes } from "./user.routes";
import { ExpenseRoutes } from "./expense.routes";
import { IncomeRoutes } from "./income.routes";

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

        app['prefix']('/expense', data => {
            ExpenseRoutes(data)
        });

        app['prefix']('/income', data => {
            IncomeRoutes(data)
        });

    })

    app.use(expressRouter);
    app.use(errorHandler);
};
