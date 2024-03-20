import { ErrorService } from '../utils/error.service';
import {
     IncomeRepository, IncomeModel, ValidatedRequest, ValidatedRequestBody
} from '..';

export class IncomeController {

    
    static async create(req: ValidatedRequest<ValidatedRequestBody<IncomeModel>>, res) {
        try {
            const data = await IncomeRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await IncomeRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}