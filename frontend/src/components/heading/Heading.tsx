import React from 'react';
import './Heading.scss';

interface Props {
    title: string;
}

const Heading: React.FC<Props> = ({ title }) => (
    <>
        <h2>{title}</h2>
        <hr />
    </>
);

export default Heading;
