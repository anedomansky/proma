import React from 'react';
import './List.scss';

const List: React.FC = ({ children }) => (
    <ul>
        {
            React.Children.map(children, (child) => (
                <li>
                    {child}
                </li>
            ))
        }
    </ul>
);

export default List;
