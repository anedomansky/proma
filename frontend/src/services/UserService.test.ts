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
});
