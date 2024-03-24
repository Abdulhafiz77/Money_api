import { MoneyController } from './../controller/money.controller';
import * as express from "express";
import { createValidator } from "express-joi-validation";
import { money_joi, id_joi, query_params_joi } from "..";
const validator = createValidator({ passError: true });

export const MoneyRoutes = (app: express.Application) => {
    app.post('/', validator.body(money_joi), MoneyController.create);
    app.get('/', validator.query(query_params_joi), MoneyController.getAll);
    app.get('/:id', validator.params(id_joi), MoneyController.getById);
    app.get('/history/:id', validator.params(id_joi), MoneyController.getHistoryById);
    app.put('/:id', validator.params(id_joi), validator.body(money_joi), MoneyController.update);
    app.delete('/:id', validator.params(id_joi), MoneyController.delete);
};