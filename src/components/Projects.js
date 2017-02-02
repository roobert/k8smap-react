import React from 'react';
import { connect } from 'react-redux';
import Project from './Project'

const mapStateToProps = (state) => {
  return {
    projects: state.projects
  }
};

export const Projects = ({ projects }) => (
  <div>
    {projects.map(project =>
      <Project
        key={project.name}
        project={project}
      />
    )}
  </div>
);

export const ProjectsContainer = connect(
  mapStateToProps,
)(Projects);
