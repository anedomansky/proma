import {
    action, computed, observable, makeObservable,
} from 'mobx';
import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';
import UserService from '../services/UserService';

class UserStore {
    private updatingData: boolean;

    private errorOccurred: boolean;

    private users: User[];

    private user: User | null;

    private token: string | null;

    constructor() {
        makeObservable<this, 'updatingData' | 'errorOccurred' | 'users' | 'user' | 'token'>(this, {
            updatingData: observable,
            errorOccurred: observable,
            users: observable,
            user: observable,
            token: observable,
            currentUpdatingData: computed,
            currentErrorOccurred: computed,
            currentUsers: computed,
            currentUser: computed,
            getAll: action,
            getByEmail: action,
            register: action,
            login: action,
        });
        this.updatingData = false;
        this.errorOccurred = false;
        this.users = [];
        this.user = JSON.parse(window.localStorage.getItem('user') || '{}');
        this.token = window.localStorage.getItem('token');
    }

    public get currentUpdatingData(): boolean {
        return this.updatingData;
    }

    public get currentErrorOccurred(): boolean {
        return this.errorOccurred;
    }

    public get currentUsers(): User[] {
        return this.users;
    }

    public get currentUser(): User | null {
        return this.user;
    }

    public async getAll(): Promise<void> {
        try {
            this.updatingData = true;
            this.errorOccurred = false;
            this.users = await UserService.getAll();
        } catch (error) {
            console.error(error);
            this.errorOccurred = true;
        } finally {
            this.updatingData = false;
        }
    }

    public async getByEmail(email: string): Promise<User | null> {
        try {
            // TODO: first try to find the user in this.users
            this.updatingData = true;
            this.errorOccurred = false;
            return await UserService.getByEmail(email);
        } catch (error) {
            console.error(error);
            this.errorOccurred = true;
            return null;
        } finally {
            this.updatingData = false;
        }
    }

    public async register(firstName: string, lastName: string, email: string, password: string): Promise<void> {
        try {
            this.updatingData = true;
            this.errorOccurred = false;
            await UserService.register(firstName, lastName, email, password);
        } catch (error) {
            console.error(error);
            this.errorOccurred = true;
        } finally {
            this.updatingData = false;
        }
    }

    public async login(email: string, password: string): Promise<void> {
        try {
            this.updatingData = true;
            this.errorOccurred = false;
            const loginResponse: LoginResponse = await UserService.login(email, password);
            if (loginResponse.user && loginResponse.token) {
                this.token = loginResponse.token;
                this.user = loginResponse.user;
                console.log(this.user);
                window.localStorage.setItem('token', this.token);
                window.localStorage.setItem('user', JSON.stringify(this.user));
            }
        } catch (error) {
            console.error(error);
            this.errorOccurred = true;
        } finally {
            this.updatingData = false;
        }
    }

    public logout(): void {
        this.user = null;
        this.token = null;
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
    }

    public async isAuthenticated(): Promise<boolean> {
        if (this.user && this.token) {
            await UserService.verifyUser(this.user, this.token);
        }
        return false;
    }
}

export default UserStore;
