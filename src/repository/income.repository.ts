import { pgPoolQuery, IncomeModel, BaseStatusEnum, PaginationParams } from "..";


export class IncomeRepository {

    static async create(params: IncomeModel): Promise<IncomeModel> {

        const sql = `
                INSERT INTO public.income (moneys_id, save)
                VALUES ($1, $2) RETURNING *;`
        const result = await pgPoolQuery(sql, [ params.moneys_id, params.save]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }


    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.income SET status = ${BaseStatusEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }
}