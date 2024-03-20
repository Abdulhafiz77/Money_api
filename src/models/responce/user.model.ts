import { BaseModel } from "..";

export interface UserModel extends BaseModel {
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  phone: string;
}
