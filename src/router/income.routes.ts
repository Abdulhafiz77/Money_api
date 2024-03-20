import * as express from "express";
import { createValidator } from "express-joi-validation";
import {income_joi, id_joi, query_params_joi, IncomeController } from "..";
const validator = createValidator({ passError: true });

export const IncomeRoutes = (app: express.Application) => {
    app.post('/', validator.body(income_joi), IncomeController.create);
    app.delete('/:id', validator.params(id_joi), IncomeController.delete);
};