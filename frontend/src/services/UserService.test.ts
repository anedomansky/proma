import { LoginResponse } from '../interfaces/LoginResponse';
import { User } from '../interfaces/User';
import UserService from './UserService';

describe('UserService', () => {
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

    it('getAll() returns User[]', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(users),
        }));
        global.fetch = fakeFetch;

        const result = await UserService.getAll();

        expect(result).toBe(users);
    });

    it('getAll() returns []', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 404,
        }));
        global.fetch = fakeFetch;

        const result = await UserService.getAll();

        expect(result).toEqual([]);
    });

    it('getAll() throws new Error()', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ message: 'Test-Error' }),
            status: 500,
        }));
        global.fetch = fakeFetch;

        try {
            await UserService.getAll();
        } catch (error) {
            expect(error).toEqual(new Error('Test-Error'));
        }
    });

    it('getByEmail() returns User', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(users[0]),
        }));
        global.fetch = fakeFetch;

        const result = await UserService.getByEmail('test@gmx.de');

        expect(result).toBe(users[0]);
    });

    it('getByEmail() returns null', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 404,
        }));
        global.fetch = fakeFetch;

        const result = await UserService.getByEmail('test@gmx.de');

        expect(result).toEqual(null);
    });

    it('getByEmail() throws new Error()', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ message: 'Test-Error' }),
            status: 500,
        }));
        global.fetch = fakeFetch;

        try {
            await UserService.getByEmail('test@gmx.de');
        } catch (error) {
            expect(error).toEqual(new Error('Test-Error'));
        }
    });

    it('register() returns User', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(users[0]),
        }));
        global.fetch = fakeFetch;

        const result = await UserService.register(users[0].firstName, users[0].lastName, users[0].email, 'Test1234');

        expect(result).toBe(users[0]);
    });

    it('register() throws new Error()', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve({ message: 'Test-Error' }),
            status: 500,
        }));
        global.fetch = fakeFetch;

        try {
            await UserService.register(users[0].firstName, users[0].lastName, users[0].email, 'Test1234');
        } catch (error) {
            expect(error).toEqual(new Error('Test-Error'));
        }
    });

    it('login() returns valid LoginResponse', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(loginResponse),
        }));
        global.fetch = fakeFetch;

        const result = await UserService.login(users[0].email, 'Test1234');

        expect(result.user).toBe(users[0]);
        expect(result.token).toBe(loginResponse.token);
    });

    it('login() throws new Error() (403/404)', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            json: () => Promise.resolve(noUserResponse),
            status: 404,
        }));
        global.fetch = fakeFetch;

        try {
            await UserService.login(users[0].email, 'Test1234');
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

        try {
            await UserService.login(users[0].email, 'Test1234');
        } catch (error) {
            expect(error).toEqual(new Error('TestMessage'));
        }
    });

    it('verifyUser() returns true', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 200,
        }));
        global.fetch = fakeFetch;

        const result = await UserService.verifyUser(users[0], loginResponse.token);

        expect(result).toBeTruthy();
    });

    it('verifyUser() returns true', async () => {
        const fakeFetch = jest.fn().mockImplementation(() => Promise.resolve({
            status: 500,
        }));
        global.fetch = fakeFetch;

        const result = await UserService.verifyUser(users[0], loginResponse.token);

        expect(result).toBeFalsy();
    });
});
