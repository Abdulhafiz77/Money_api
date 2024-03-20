
export interface TokenPayload {
    id: number;
    email: string;
    phone: string;
    full_name: string;
    date: Date;
}

export interface AuthenticateModel {
    email: string;
    password: string;
}
