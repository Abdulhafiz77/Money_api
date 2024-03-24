import * as express from "express";
import { createValidator } from "express-joi-validation";
import { history_joi, id_joi, HistoryController } from "..";
const validator = createValidator({ passError: true });

export const HistoryRoutes = (app: express.Application) => {
    app.post('/', validator.body(history_joi), HistoryController.create);
    app.delete('/:id', validator.params(id_joi), HistoryController.delete);
};