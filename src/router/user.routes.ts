import { UserController } from '../controller/user.controller';
import * as express from "express";
import { createValidator } from "express-joi-validation";
import { user_add_joi, id_joi, user_query_joi } from "..";
const validator = createValidator({ passError: true });

export const UserRoutes = (app: express.Application) => {
    app.post('/', validator.body(user_add_joi), UserController.create);
    app.get('/', validator.query(user_query_joi), UserController.getAll);
    app.get('/:id', validator.params(id_joi), UserController.getById);
    app.put('/:id', validator.params(id_joi), validator.body(user_add_joi), UserController.update);
    app.delete('/:id', validator.params(id_joi), UserController.delete);
};
