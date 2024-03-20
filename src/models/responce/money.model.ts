import { BaseModel } from "..";

export interface MoneysModel extends BaseModel {
    type_of: string;
    value: number;
    users_id: number;
}