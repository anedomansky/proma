import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import useStores from '../../hooks/useStores';
import Button from '../button/Button';
import Input from '../input/Input';
import './Registration.scss';

const Registration: React.FC = () => {
    const { userStore } = useStores();
    const history = useHistory();
    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [repeatedPassword, setRepeatedPassword] = useState<string>('');

    const register = async () => {
        try {
            await userStore.register(firstName, lastName, email, password);
            history.push('/login/successful');
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <section className="registration">
            <h2>Registration</h2>
            <hr />
            <form onSubmit={(e) => e.preventDefault()}>
                <div className="form-row">
                    <Input
                        label="First Name"
                        id="firstname"
                        type="text"
                        pattern="[0-9A-Za-z ]{2,32}"
                        minLength={2}
                        maxLength={32}
                        title="Length: 2 - 32 characters."
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    <Input
                        label="Last Name"
                        id="lastname"
                        type="text"
                        pattern="[0-9A-Za-z ]{2,32}"
                        minLength={2}
                        maxLength={32}
                        title="Length: 2 - 32 characters."
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    <Input
                        label="E-Mail"
                        id="mail"
                        type="email"
                        pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    <Input
                        label="Password"
                        id="password"
                        type="password"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                        title="Length: 8 - 20. Use at least one lowercase character, one uppercase character and one number."
                        minLength={8}
                        maxLength={20}
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    <Input
                        label="Repeat Password"
                        id="repeat-password"
                        type="password"
                        pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                        title="Has to match the aforementioned password."
                        minLength={8}
                        maxLength={20}
                        value={repeatedPassword}
                        onChange={(event) => setRepeatedPassword(event.target.value)}
                    />
                </div>
                <div className="form-row">
                    {repeatedPassword.length > 0 && repeatedPassword !== password && (
                        <p>Passwords do not match!</p>
                    )}
                    {userStore.currentErrorOccurred && <p>An error occurred! Please try again later!</p>}
                    <div className="submit">
                        <Button type="submit" ariaLabel="Register" onClick={() => register()}>
                            <span>Register</span>
                        </Button>
                    </div>
                </div>
            </form>
        </section>
    );
};

export default observer(Registration);
