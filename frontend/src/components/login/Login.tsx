import { observer } from 'mobx-react-lite';
import React, { useEffect, useState } from 'react';
import { Link, useHistory, useParams } from 'react-router-dom';
import useStores from '../../hooks/useStores';
import { LoginValidation } from '../../interfaces/LoginValidation';
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
    const [formValid, setFormValid] = useState<boolean>(false);
    const [userLogin, setUserLogin] = useState<LoginValidation>({
        email: {
            value: '',
            valid: false,
        },
        password: {
            value: '',
            valid: false,
        },
    });

    useEffect(() => {
        setFormValid(userLogin.email.valid && userLogin.password.valid);
    }, [userLogin.email.valid, userLogin.password.valid]);

    const login = async () => {
        const result = await userStore.login(userLogin.email.value, userLogin.password.value);
        if (result) {
            history.push('/');
        }
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
                    value={userLogin.email.value}
                    onChange={(validation) => setUserLogin({ ...userLogin, email: { value: validation.value.toLowerCase(), valid: validation.valid } })}
                />
                <Input
                    label="Password"
                    id="password"
                    type="password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                    title="Length: 8 - 20. Use at least one lowercase character, one uppercase character and one number."
                    minLength={8}
                    maxLength={20}
                    value={userLogin.password.value}
                    onChange={(validation) => setUserLogin({ ...userLogin, password: validation })}
                />
                <div className="submit">
                    <Button type="submit" ariaLabel="Sign in" onClick={() => login()} disabled={!formValid}>
                        <span>Sign In</span>
                    </Button>
                    <Link to="/register" className="register">Not a user yet?</Link>
                </div>
            </Form>
        </section>
    );
};

export default observer(Login);
