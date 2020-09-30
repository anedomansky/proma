import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../button/Button';
import Input from '../input/Input';
import './Login.scss';

const Login: React.FC = () => (
    <section className="login">
        <h2>Sign In</h2>
        <hr />
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
                <Input
                    label="E-Mail"
                    id="mail"
                    type="email"
                    pattern="[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2, 4}$"
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
                />
            </div>
            <div className="form-row">
                <div className="submit">
                    <Button type="submit" ariaLabel="Sign in" onClick={() => null}>
                        <span>Sign In</span>
                    </Button>
                    <Link to="/register" className="register">Not a user yet?</Link>
                </div>
            </div>
        </form>
    </section>
);

export default Login;
