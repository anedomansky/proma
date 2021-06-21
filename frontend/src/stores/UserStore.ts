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
            setUpdatingData: action,
            setErrorOccurred: action,
            setUsers: action,
            setUser: action,
            setToken: action,
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

    public get isAdmin(): boolean {
        if (this.user) {
            return this.user.isAdmin;
        }
        return false;
    }

    public setUpdatingData(updatingData: boolean): void {
        this.updatingData = updatingData;
    }

    public setErrorOccurred(errorOccurred: boolean): void {
        this.errorOccurred = errorOccurred;
    }

    public setUsers(users: User[]): void {
        this.users = users;
    }

    public setUser(user: User | null): void {
        this.user = user;
    }

    public setToken(token: string | null): void {
        this.token = token;
    }

    public async getAll(): Promise<void> {
        try {
            this.setUpdatingData(true);
            this.setErrorOccurred(false);
            this.setUsers(await UserService.getAll());
        } catch (error) {
            console.error(error);
            this.setErrorOccurred(true);
        } finally {
            this.setUpdatingData(false);
        }
    }

    public async getByEmail(email: string): Promise<User | null> {
        try {
            // TODO: first try to find the user in this.users
            this.setUpdatingData(true);
            this.setErrorOccurred(false);
            return await UserService.getByEmail(email);
        } catch (error) {
            console.error(error);
            this.setErrorOccurred(true);
            return null;
        } finally {
            this.setUpdatingData(false);
        }
    }

    public async register(firstName: string, lastName: string, email: string, password: string): Promise<boolean> {
        try {
            this.setUpdatingData(true);
            this.setErrorOccurred(false);
            const user = await UserService.register(firstName, lastName, email, password);
            return !!user;
        } catch (error) {
            console.error(error);
            this.setErrorOccurred(true);
            return false;
        } finally {
            this.setUpdatingData(false);
        }
    }

    public async login(email: string, password: string): Promise<boolean> {
        try {
            this.setUpdatingData(true);
            this.setErrorOccurred(false);
            const loginResponse: LoginResponse = await UserService.login(email, password);
            if (loginResponse.user && loginResponse.token) {
                this.setToken(loginResponse.token);
                this.setUser(loginResponse.user);
                window.localStorage.setItem('token', this.token as string);
                window.localStorage.setItem('user', JSON.stringify(this.user));
            }
            return !!loginResponse.user && !!loginResponse.token;
        } catch (error) {
            console.error(error);
            this.setErrorOccurred(true);
            return false;
        } finally {
            this.setUpdatingData(false);
        }
    }

    public logout(): void {
        this.setUser(null);
        this.setToken(null);
        window.localStorage.removeItem('token');
        window.localStorage.removeItem('user');
    }

    public async isAuthenticated(): Promise<boolean> {
        if (this.user && this.token) {
            const isAuthenticated = await UserService.verifyUser(this.user, this.token);
            if (!isAuthenticated) {
                this.logout();
                return false;
            }
            return true;
        }
        return false;
    }
}

export default UserStore;
