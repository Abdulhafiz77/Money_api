import { pgPoolQuery, UserModel, BaseStatusEnum, UserParams } from "..";


export class UserRepository {

    static async getAll(params: UserParams): Promise<UserModel[]> {
        const parameters: any = [];
        let pagination = '';
        let filter = '';

        if (params.limit && !isNaN(params.page)) {
            parameters.push(params.limit, (params.page - 1) * params.limit);
            pagination = ` LIMIT $1 OFFSET $2`;
        }
        
        if (params.status) {
            parameters.push(params.status);
            filter += ` and u.status = $${parameters.length}`;
        }
        const sql = `select CONCAT (u.first_name, ' ', u.last_name, ' ', u.middle_name) AS full_name,
                        u.first_name,
                        u.last_name,
                        u.middle_name,
                        u.id,
                        u.email,
                        u.password,
                        u.phone,
                        u.created_at,
                        u.updated_at,
                        u.status
                  from public.users as u 
                  where 1=1 ${filter}
                  order by u.created_at desc ${pagination}`;
        const result = await pgPoolQuery(sql);

        return result.rows
    }
    static async getById(id: number): Promise<UserModel> {
        const sql = `select CONCAT (u.first_name, ' ', u.last_name, ' ', u.middle_name) AS full_name,
                       u.first_name,
                       u.last_name,
                       u.middle_name,
                       u.email,
                       u.password,
                       u.phone,
                       u.created_at,
                       u.updated_at,
                       u.status,
                       u.id
                    from public.users as u
                        where u.id = $1`
        const result = await pgPoolQuery(sql, [id]);

        return result.rows[0]
    }
    static async create(params: UserModel): Promise<UserModel> {

        const sql = `
                INSERT INTO public.users (first_name, last_name, middle_name, email, password, phone)
                VALUES ($1, $2, $3, $4, $5, $6) RETURNING *;`
        const result = await pgPoolQuery(sql, [ params.first_name,
            params.last_name, params.middle_name, params.email, params.password, params.phone]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }

    static async update(params: UserModel): Promise<UserModel> {
        const sql = `update public.users set 
                         first_name = $1,
                         last_name = $2,
                         middle_name = $3,
                         email = $4,
                         password = $5,
                         phone = $6,
                         status = $7,
                         updated_at = NOW()
                         where id = $8 RETURNING *;`

        const result = await pgPoolQuery(sql,
            [ params.first_name, params.last_name, params.middle_name, params.email,
                params.password,  params.phone, params.status, params.id]);

        if (!result.rows || result.rows.length === 0)
            return null as any;

        return result.rows[0];
    }

    static async delete(id: number): Promise<void> {
        const sql = `UPDATE public.users SET status = ${BaseStatusEnum.DELETED} where id = $1`;
        await pgPoolQuery(sql, [id]);

    }
}