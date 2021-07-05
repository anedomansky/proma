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

        await store.login(users[0].email, 'Test1234');

        expect(store.currentUser).toEqual(users[0]);
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
        }));
        global.fetch = fakeFetch;

        const store = new UserStore();
        const result = await store.register(users[0].firstName, users[0].lastName, users[0].email, 'Test1234');

        expect(result).toBeFalsy();
    });
});
