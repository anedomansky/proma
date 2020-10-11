import { ErrorResponse } from '../interfaces/ErrorResponse';
import { LoginRequest } from '../interfaces/LoginRequest';
import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';

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
        let isAdmin = false;
        const checkIfUsersExist = await fetch('http://localhost:4001/users/all');
        if (checkIfUsersExist.status === 404) {
            isAdmin = true;
        }
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
                isAdmin,
            } as User),
        });
        const { status } = response;
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const newUser: User = await response.json();
        return newUser;
    }

    public static async login(email: string, password: string): Promise<string> {
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
            return noUser.message;
        }
        if (status === 403) {
            const wrongCredentials: LoginResponse = await response.json();
            return wrongCredentials.message;
        }
        if (status === 500) {
            const error: ErrorResponse = await response.json();
            throw new Error(error.message);
        }
        const success: LoginResponse = await response.json();
        return success.message; // TODO: save the received JWT token in storage; send it with every request
    }
}

export default UserService;
