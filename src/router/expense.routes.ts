import * as express from "express";
import { createValidator } from "express-joi-validation";
import { expense_joi, id_joi, query_params_joi, ExpenseController } from "..";
const validator = createValidator({ passError: true });

export const ExpenseRoutes = (app: express.Application) => {
    app.post('/', validator.body(expense_joi), ExpenseController.create);
    app.delete('/:id', validator.params(id_joi), ExpenseController.delete);
};