import React from 'react';
import './Form.scss';

const Form: React.FC = ({ children }) => (
    <form onSubmit={(e) => e.preventDefault()}>
        {
            React.Children.map(children, (child) => (
                <div className="form-row">
                    {child}
                </div>
            ))
        }
    </form>
);

export default Form;
