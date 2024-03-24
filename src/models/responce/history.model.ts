import { BaseModel } from "..";

export interface HistoryModel extends BaseModel {
    value: number;
    moneys_id: number;
    type: string;
}