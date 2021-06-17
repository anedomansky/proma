import { observer } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useStores from '../../hooks/useStores';
import Button from '../button/Button';
import Form from '../form/Form';
import Input from '../input/Input';
import './Login.scss';

interface Params {
    registered?: string;
}

const Login: React.FC = () => {
    const { userStore } = useStores();
    const { registered } = useParams<Params>();
    const history = useHistory();
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const login = async () => {
        await userStore.login(email, password);
        history.push('/');
    };

    return (
        <section className="login">
            <h2>Sign In</h2>
            <hr />
            {registered && <h3>Registration successful! Please proceed with the login now.</h3>}
            {userStore.currentErrorOccurred && <h3 className="login-fail">Login failed! Wrong credentials!</h3>}
            <Form>
                <Input
                    label="E-Mail"
                    id="mail"
                    type="email"
                    pattern="^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$"
                    value={email}
                    onChange={(event) => null}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                    title="Length: 8 - 20. Use at least one lowercase character, one uppercase character and one number."
                    minLength={8}
                    maxLength={20}
                    value={password}
                    onChange={(event) => null}
                />
                <div className="submit">
                    <Button type="submit" ariaLabel="Sign in" onClick={() => login()}>
                        <span>Sign In</span>
                    </Button>
                    <Link to="/register" className="register">Not a user yet?</Link>
                </div>
            </Form>
        </section>
    );
};

export default observer(Login);
