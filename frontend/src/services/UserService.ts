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
        return response.json();
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
        return response.json();
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
        return response.json();
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
        if (status === 404 || status === 403) {
            const credentialsError: LoginResponse = await response.json();
            throw Error(credentialsError.message);
        }
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        return response.json();
    }

    public static async verifyUser(user: User, token: string): Promise<boolean> {
        const response = await fetch('http://localhost:4001/users/verifyUser', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                token,
            },
            body: JSON.stringify(user),
        });
        const { status } = response;
        if (status === 200) {
            return true;
        }
        return false;
    }
}

export default UserService;
