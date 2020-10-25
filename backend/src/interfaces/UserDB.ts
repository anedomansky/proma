export interface UserDB {
    first_name: string;
    last_name: string;
    email: string;
    created_on: Date;
    is_admin: boolean;
    password?: string;
}
