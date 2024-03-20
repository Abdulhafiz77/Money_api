import { ErrorService } from '../utils/error.service';
import { CONFLICT } from 'http-status-codes';
import {
     MoneyRepository, MoneysModel, ValidatedRequest, ValidatedRequestQuery,
     PaginationParams, ValidatedRequestBody, ErrorEnum,
} from '..';


export class MoneyController {

    static async getAll(req: ValidatedRequest<ValidatedRequestQuery<PaginationParams>>, res) {
        try {

            let data = await MoneyRepository.getAll(req.query);
            if (!data[0]) return res.send(null);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getById(req: ValidatedRequest<any>, res) {
        try {

            let data = await MoneyRepository.getById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getIncomeById(req: ValidatedRequest<any>, res) {
        try {

            let data = await MoneyRepository.getIncomeById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async getExpenseById(req: ValidatedRequest<any>, res) {
        try {

            let data = await MoneyRepository.getExpenseById(req.params.id);
            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async create(req: ValidatedRequest<ValidatedRequestBody<MoneysModel>>, res) {
        try {
            const data = await MoneyRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async update(req: ValidatedRequest<ValidatedRequestBody<MoneysModel>>, res) {
        try {
            req.body.id = req.params.id;

            let checkId = await MoneyRepository.getById(req.params.id);
            if (!checkId) return ErrorService.error(res, ErrorEnum.NotFound, CONFLICT);
            if (!req.body.status) req.body.status = checkId.status!;

            let data = await MoneyRepository.update(req.body);

            return res.send(data);
        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await MoneyRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}
