import React from 'react';
import { useHistory } from 'react-router';
import backArrow from '../../assets/icons/back-arrow.svg';
import Button from '../button/Button';
import './ProjectCreate.scss';

const ProjectCreate: React.FC = () => {
    const history = useHistory();

    return (
        <section>
            <h1>
                <Button type="button" onClick={() => history.goBack()}>
                    <img src={backArrow} alt="Back" />
                </Button>
                Create a new project
            </h1>
        </section>
    );
};

export default ProjectCreate;
