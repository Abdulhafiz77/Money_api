import { pgPoolQuery, HistoryModel, BaseStatusEnum } from "..";


export class HistoryRepository {

    static async create(params: HistoryModel): Promise<HistoryModel> {

        const sql = `
                INSERT INTO public.history (moneys_id, value, type)
                VALUES ($1, $2, $3) RETURNING *;`
        const result = await pgPoolQuery(sql, [ params.moneys_id, params.value, params.type]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }


    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.history SET status = ${BaseStatusEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }
}