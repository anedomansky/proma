import { UserResponse } from './UserResponse';

export interface LoginResponse {
    message: string;
    token: string;
    user?: UserResponse;
}
