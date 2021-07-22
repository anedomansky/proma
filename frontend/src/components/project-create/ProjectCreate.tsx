import React from 'react';
import { useHistory } from 'react-router';
import backArrow from '../../assets/icons/back-arrow.svg';
import Button from '../button/Button';
import Form from '../form/Form';
import Heading from '../heading/Heading';
import Input from '../input/Input';
import './ProjectCreate.scss';

const ProjectCreate: React.FC = () => {
    const history = useHistory();

    return (
        <section className="project-create">
            <Heading>
                <Button type="button" onClick={() => history.goBack()}>
                    <img src={backArrow} alt="Back" />
                </Button>
                Create a new project
            </Heading>
            <Form>
                <Input
                    label="Name"
                    id="name"
                    type="text"
                    pattern="[0-9A-Za-z ]{2,}"
                    minLength={2}
                    value=""
                    onChange={(validation) => null}
                />
                <Input
                    label="Assign users"
                    id="users"
                    type="text"
                    pattern="[0-9A-Za-z ]{2,}"
                    minLength={2}
                    value=""
                    onChange={(validation) => null}
                />
                <span>USERS LIST</span>
                <div className="submit">
                    SUBMIT
                </div>
            </Form>
        </section>
    );
};

export default ProjectCreate;
