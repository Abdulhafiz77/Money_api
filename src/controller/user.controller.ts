import { ErrorService } from '../utils/error.service';
import { CONFLICT } from 'http-status-codes';
import {
     UserRepository, UserModel, ValidatedRequest, ValidatedRequestQuery,
     PaginationParams, ValidatedRequestBody, ErrorEnum,
} from '..';


export class UserController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {

            let data = await UserRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getById(req: ValidatedRequest<any>, res) {
        try {

            let data = await UserRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async create(req: ValidatedRequest<ValidatedRequestBody<UserModel>>, res) {
        try {
            const data = await UserRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<UserModel>>, res) {
        try {
            req.body.id = req.params.id;

            let checkId = await UserRepository.getById(req.params.id);
            if (!checkId) return ErrorService.error(res, ErrorEnum.NotFound, CONFLICT);
            if (!req.body.status) req.body.status = checkId.status!;

            let data = await UserRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await UserRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}
