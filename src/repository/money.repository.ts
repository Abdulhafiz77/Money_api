import { pgPoolQuery, MoneysModel, BaseStatusEnum, QueryParams } from "..";


export class MoneyRepository {

    static async getAll(params: QueryParams): Promise<MoneysModel[]> {
        const parameters: any = [];
        let pagination = '';
        let filter = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }

        if (params.status) {
            parameters.push(params.status);
            filter += ` and m.status = $${parameters.length}`;
        }
        const sql = `select
                      m.id,
                      m.type_of,
                      m.users_id,
                      m.value,
                      m.created_at,
                      m.updated_at,
                      m.status
                   from public.moneys as m
                   Where 1=1 ${filter}
                   order by m.id asc ${pagination};; 
                   `;
        const result = await pgPoolQuery(sql);
        return result.rows
    }
    static async getById(id: number): Promise<MoneysModel> {
        const sql = `select 
                       m.type_of,
                       m.users_id,
                       m.value,
                       m.created_at,
                       m.updated_at,
                       m.status,
                       m.id
                    from public.moneys as m 
                    join users u on u.id = m.users_id
                        where m.id = $1 
                        `
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async getHistoryById(id: number): Promise<MoneysModel> {
        const sql = `select m.id, 
                            m.type_of,
                            m.users_id,
                            m.value,
                            m.created_at,
                            m.updated_at,
                            m.status,
                      COALESCE(json_agg( json_build_object('add', 
                      CASE WHEN h.type = 'income' 
                      THEN h.value END, 'created_at', 
                      CASE WHEN h.type = 'income' 
                      THEN h.created_at END))
                      FILTER(WHERE h.value IS NOT NULL), '[]') 
                      AS income,
                      COALESCE(json_agg(json_build_object('exit', 
                      CASE WHEN h.type = 'expense' 
                      THEN h.value END, 'created_at', 
                      CASE WHEN h.type = 'expense' 
                      THEN h.created_at END))
                      FILTER (WHERE h.value IS NOT NULL), '[]') 
                      AS expense,
                      SUM(CASE WHEN h.type = 'income' 
                      THEN h.value ELSE 0 END) 
                      AS income_total,
                      SUM(CASE WHEN h.type = 'expense' 
                      THEN h.value ELSE 0 END) 
                      AS expense_total
                      FROM public.moneys m
                      LEFT JOIN public.history h ON h.moneys_id = m.id 
                      AND (h.type = 'income' OR h.type = 'expense')
                      WHERE m.id = $1
                      GROUP BY m.id, m.type_of, m.value, m.created_at, m.status
                      ORDER BY m.created_at desc; 
                        `
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async create(params: MoneysModel): Promise<MoneysModel> {

        const sql = `
                INSERT INTO public.moneys (users_id, type_of, value)
                VALUES ($1, $2, $3) RETURNING *;`
        const result = await pgPoolQuery(sql, [ params.users_id,
            params.type_of, params.value]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }

    static async update(params: MoneysModel): Promise<MoneysModel> {
        const sql = `update public.moneys set 
                        users_id = $1,
                         type_of = $2,
                         value = $3,
                         status = $4,
                         updated_at = NOW()
                         where id = $5 RETURNING *;`

        const result = await pgPoolQuery(sql,
            [ params.users_id, params.type_of, params.value,
                                  params.status, params.id]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.moneys SET status = ${BaseStatusEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }
}