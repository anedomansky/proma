import React from 'react';
import './Login.scss';

const Login: React.FC = () => (
    <section className="login">
        <h2>Sign In</h2>
        <hr />
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
                <label htmlFor="mail">E-Mail</label>
                <input id="mail" name="mail" type="text" />
            </div>
        </form>
    </section>
);

export default Login;
