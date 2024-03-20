import { ErrorService } from '../utils/error.service';
import {
     ExpenseRepository, ExpenseModel, ValidatedRequest, ValidatedRequestBody
} from '..';


export class ExpenseController {

    static async create(req: ValidatedRequest<ValidatedRequestBody<ExpenseModel>>, res) {
        try {
            const data = await ExpenseRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await ExpenseRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}