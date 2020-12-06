import React from 'react';
import ProjectTaskSearch from '../project-task-search/ProjectTaskSearch';
import './LandingPage.scss';

const LandingPage: React.FC = () => (
    <section className="landing-page">
        <ProjectTaskSearch />
    </section>
);

export default LandingPage;
