import { ErrorService } from '../utils/error.service';
import {
     HistoryRepository, HistoryModel, ValidatedRequest, ValidatedRequestBody
} from '..';


export class HistoryController {

    static async create(req: ValidatedRequest<ValidatedRequestBody<HistoryModel>>, res) {
        try {
            const data = await HistoryRepository.create(req.body)

            return res.send(data);

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

    static async delete(req: ValidatedRequest<any>, res) {
        try {

            await HistoryRepository.delete(req.params.id);

            return res.send({ success: true });

        } catch (error) {
            return ErrorService.error(res, error);
        }
    }

}