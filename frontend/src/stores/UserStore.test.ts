import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';
import UserStore from './UserStore';

describe('UserStore', () => {
    const users: User[] = [
        {
            createdOn: new Date(),
            email: 'test@gmx.de',
            isAdmin: false,
            firstName: 'testFirstName',
            lastName: 'testLastName',
        },
    ];

    const loginResponse: LoginResponse = {
        message: 'TestMessage',
        token: 'dsgshr3525',
        user: users[0],
    };

    const noUserResponse: LoginResponse = {
        ...loginResponse,
        token: undefined,
        user: undefined,
    };

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('getAll() sets this.users', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(users),
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        await store.getAll();

        expect(store.currentUsers).toEqual(users);
    });

    it('getAll() throws new Error()', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 500,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        try {
            await store.getAll();
            expect(store.currentUpdatingData).toBeTruthy();
        } catch (error) {
            expect(store.currentErrorOccurred).toBeTruthy();
        }

        expect(store.currentUpdatingData).toBeFalsy();
    });

    it('login() returns valid LoginResponse', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(loginResponse),
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();

        const login = await store.login(users[0].email, 'Test1234');

        expect(store.currentToken).toBeTruthy();
        expect(store.currentUser).toBeTruthy();
        expect(login).toBeTruthy();
    });

    it('login() throws new Error() (403/404)', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(noUserResponse),
            status: 404,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();

        try {
            await store.login(users[0].email, 'Test1234');
        } catch (error) {
            expect(error).toEqual(new Error('TestMessage'));
        }
    });

    it('login() throws new Error() (500)', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(noUserResponse),
            status: 500,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();

        try {
            await store.login(users[0].email, 'Test1234');
        } catch (error) {
            expect(error).toEqual(new Error('TestMessage'));
        }
    });

    it('register() returns true', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(users[0]),
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        const result = await store.register(users[0].firstName, users[0].lastName, users[0].email, 'Test1234');

        expect(result).toBeTruthy();
    });

    it('register() returns false', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(),
            status: 500,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        const result = await store.register(users[0].firstName, users[0].lastName, users[0].email, 'Test1234');

        expect(result).toBeFalsy();
    });

    it('getByEmail() returns User', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(users[0]),
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        const result = await store.getByEmail('test@gmx.de');

        expect(result).toBe(users[0]);
    });

    it('getByEmail() returns null', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 404,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        const result = await store.getByEmail('test@gmx.de');

        expect(result).toEqual(null);
    });

    it('getByEmail() throws new Error()', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ message: 'Test-Error' }),
            status: 500,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();

        try {
            await store.getByEmail('test@gmx.de');
        } catch (error) {
            expect(error).toEqual(new Error('Test-Error'));
        }
    });

    it('logout()', () => {
        const store = new UserStore();

        store.logout();

        expect(store.currentUser).toBeNull();
        expect(store.currentToken).toBeNull();
    });

    it('isAdmin()', () => {
        const store = new UserStore();

        store.setUser(null);
        const isAdmin = store.isAdmin();

        expect(isAdmin).toBeFalsy();
    });

    it('isAuthenticated() returns true', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 200,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        store.setUser(users[0]);
        store.setToken(loginResponse.token);

        const result = await store.isAuthenticated();

        expect(result).toBeTruthy();
    });

    it('isAuthenticated() has user + token and returns false', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 500,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        store.setUser(users[0]);
        store.setToken(loginResponse.token);

        const result = await store.isAuthenticated();

        expect(result).toBeFalsy();
    });

    it('isAuthenticated() returns false', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 500,
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();

        const result = await store.isAuthenticated();

        expect(result).toBeFalsy();
    });
});
