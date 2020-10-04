import { User } from '../interfaces/User';

class UserService {
    public static async getAll(): Promise<User[]> {
        const response = await fetch('http://localhost:4001/users/all');
        const users: User[] = await response.json();
        return users;
        // TODO: create ErrorRespone-interface: { code: number; message: string }
    }

    public static async getByEmail(): Promise<User> {

    }

    public static async add(): Promise<void> {

    }

    public static async login(): Promise<void> {

    }
}

export default UserService;
