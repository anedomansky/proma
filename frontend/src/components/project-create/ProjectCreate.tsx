import React from 'react';
import { useHistory } from 'react-router';
import backArrow from '../../assets/icons/back-arrow.svg';
import Button from '../button/Button';
import Form from '../form/Form';
import Heading from '../heading/Heading';
import Input from '../input/Input';
import Users from '../users/Users';
import './ProjectCreate.scss';

const ProjectCreate: React.FC = () => {
    const history = useHistory();

    return (
        <section className="project-create">
            <Button type="button" onClick={() => history.goBack()} additionalClassnames="back-btn">
                <img src={backArrow} alt="Back" />
            </Button>
            <Heading title="Create a new project" />
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
                <Button btnType="secondary" type="button" onClick={() => null} additionalClassnames="add-btn">
                    <span>Add</span>
                </Button>
                <Users />
                <div className="submit">
                    <Button btnType="primary" type="submit" ariaLabel="Create" onClick={() => null} disabled={false}>
                        <span>Create</span>
                    </Button>
                    <Button btnType="tertiary" type="button" onClick={() => history.goBack()}>
                        <span>Cancel</span>
                    </Button>
                </div>
            </Form>
        </section>
    );
};

export default ProjectCreate;
