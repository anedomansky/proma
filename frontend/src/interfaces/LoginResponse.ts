import { User } from './User';

export interface LoginResponse {
    message: string;
    token: string;
    user?: User;
}
