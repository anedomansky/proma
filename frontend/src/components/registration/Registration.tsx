import React from 'react';
import Button from '../button/Button';
import Input from '../input/Input';
import './Registration.scss';

const Registration: React.FC = () => (
    <section className="registration">
        <h2>Registration</h2>
        <hr />
        <form onSubmit={(e) => e.preventDefault()}>
            <div className="form-row">
                <Input
                    label="First Name"
                    id="firstname"
                    type="text"
                    pattern="[A-Za-z ]{2,32}"
                    minLength={2}
                    maxLength={32}
                    title="Length: 2 - 32 characters."
                />
            </div>
            <div className="form-row">
                <Input
                    label="Last Name"
                    id="lastname"
                    type="text"
                    pattern="[A-Za-z ]{2,32}"
                    minLength={2}
                    maxLength={32}
                    title="Length: 2 - 32 characters."
                />
            </div>
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
                <Input
                    label="Repeat Password"
                    id="repeat-password"
                    type="password"
                    pattern="^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,20}$"
                    title="Has to match the aforementioned password."
                    minLength={8}
                    maxLength={20}
                />
            </div>
            <div className="form-row">
                <div className="submit">
                    <Button type="submit" ariaLabel="Register" onClick={() => null}>
                        <span>Register</span>
                    </Button>
                </div>
            </div>
        </form>
    </section>
);

export default Registration;
