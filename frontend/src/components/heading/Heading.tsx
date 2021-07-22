import React from 'react';
import './Heading.scss';

interface Props {
    title?: string;
}

const Heading: React.FC<Props> = ({ title, children }) => {
    const hasChild = () => Boolean(children);

    if (hasChild()) {
        return (
            <>
                <h2>
                    {children}
                </h2>
            </>
        );
    }

    return (
        <>
            <h2>{title}</h2>
            <hr />
        </>
    );
};

export default Heading;
