import React, { useEffect, useState } from 'react';
import Form from '../form/Form';
import Heading from '../heading/Heading';
import Input from '../input/Input';
import './ProjectTaskSearch.scss';

const ProjectTaskSearch: React.FC = () => {
    const [term, setTerm] = useState<string>('');

    useEffect(() => {
        console.log('fetching all project-tasks');
    }, []);

    const search = (currentTerm: string) => {
        setTerm(currentTerm);
        // TODO: filter the database for matching results
    };

    return (
        <section className="project-task-search">
            <Heading title="Search" />
            <Form>
                <>
                    <Input
                        label="Project or Task"
                        id="search"
                        type="text"
                        value={term}
                        onChange={(event) => null}
                    />
                    {/* TODO: use List here */}
                </>
            </Form>
        </section>
    );
};

export default ProjectTaskSearch;
