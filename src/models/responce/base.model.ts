export interface BaseModel {
  created_at?: Date;
  updated_at?: Date;
  id?: number;
  status?: any;
}

export interface AuthenticatedModel {
  user_id: number;
}
