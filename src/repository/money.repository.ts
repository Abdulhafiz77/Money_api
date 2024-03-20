import { pgPoolQuery, MoneysModel, BaseStatusEnum, QueryParams, IncomeModel } from "..";


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
    static async getIncomeById(id: number): Promise<MoneysModel> {
        const sql = `select m.*,
                      COALESCE(json_agg(json_build_object('add', i.save, 'created_at', i.created_at))
                      FILTER(WHERE i.save IS NOT NULL), '[]') AS "income:",
                      SUM(i.save) AS total
                      from public.moneys m
                      left join public.income i on i.moneys_id = m.id
                      where m.id = $1
                      group by m.id, m.type_of, m.value, m.created_at, m.status
                      order by m.created_at desc; 
                        `
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }

    static async getExpenseById(id: number): Promise<MoneysModel> {
        const sql = `select m.*,
                      COALESCE(json_agg(json_build_object('exit', e.spend, 'created_at', e.created_at))
                      FILTER (WHERE e.spend IS NOT NULL), '[]') AS "expense:",
                      SUM(e.spend) AS total
                      from public.moneys m
                      left join public.expense e on e.moneys_id = m.id
                      where m.id = $1
                      group by m.id, m.type_of, m.value, m.created_at, m.status
                      order by m.created_at desc; 
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