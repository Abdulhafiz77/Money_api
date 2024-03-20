import { BaseModel } from "..";

export interface ExpenseModel extends BaseModel {
    spend: number;
    moneys_id: number;
}