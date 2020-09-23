import React from 'react';
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
                />
            </div>
            <div className="form-row">
                <button type="submit" tabIndex={0}>Sign In</button>
            </div>
        </form>
    </section>
);

export default Login;
