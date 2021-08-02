import React from 'react';
import Button from '../button/Button';
import './Users.scss';
import deleteIcon from '../../assets/icons/delete.svg';

const Users: React.FC = () => (
    <div className="users">
        <ul className="users__list">
            <li>
                <span>
                    Firstname Lastname
                </span>
                <Button type="button" onClick={() => null}>
                    <img src={deleteIcon} alt="Delete" />
                </Button>
            </li>
        </ul>
    </div>
);

export default Users;
