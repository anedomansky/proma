import { ErrorResponse } from '../interfaces/ErrorResponse';
import { LoginRequest } from '../interfaces/LoginRequest';
import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';
import { UserRegistration } from '../interfaces/UserRegistration';

class UserService {
    public static async getAll(): Promise<User[]> {
        const response = await fetch('http://localhost:4001/users/all');
        const { status } = response;
        if (status === 404) {
            return [];
        }
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const users: User[] = await response.json();
        return users;
    }

    public static async getByEmail(email: string): Promise<User | null> {
        const response = await fetch(`http://localhost:4001/users/getByEmail/${email}`);
        const { status } = response;
        if (status === 404) {
            return null;
        }
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const user: User = await response.json();
        return user;
    }

    public static async register(firstName: string, lastName: string, email: string, password: string): Promise<User> {
        const response = await fetch('http://localhost:4001/users/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                firstName,
                lastName,
                email,
                password,
            } as UserRegistration),
        });
        const { status } = response;
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const newUser: User = await response.json();
        return newUser;
    }

    public static async login(email: string, password: string): Promise<LoginResponse> {
        const response = await fetch('http://localhost:4001/users/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            } as LoginRequest),
        });
        const { status } = response;
        if (status === 404) {
            const noUser: LoginResponse = await response.json();
            return noUser;
        }
        if (status === 403) {
            const wrongCredentials: LoginResponse = await response.json();
            return wrongCredentials;
        }
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const success: LoginResponse = await response.json();
        return success;
    }
}

export default UserService;
