import { pgPoolQuery, ExpenseModel, BaseStatusEnum, PaginationParams } from "..";


export class ExpenseRepository {

    static async create(params: ExpenseModel): Promise<ExpenseModel> {

        const sql = `
                INSERT INTO public.expense (moneys_id, spend)
                VALUES ($1, $2) RETURNING *;`
        const result = await pgPoolQuery(sql, [ params.moneys_id, params.spend]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }


    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.expense SET status = ${BaseStatusEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }
}