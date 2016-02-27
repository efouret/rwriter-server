import {List, Map} from 'immutable';
import Project from './schemas/Project';

export const INITIAL_STATE = Map();

export function setProjects(state, projects) {
  const list = List(projects);
  return state.set('projects', list)
              .set('initialProjects', list);
}

export function getProject(state, project) {
    return state.set('project', project);
}

export function createProject(state, project) {
    console.log('BEGIN createProject');
    dispatch => {
        new Project(project).save()
            .then(createdProject => {
                console.log(`Project created: ${createdProject}`);
                dispatch(getProject(state, createdProject));
            }, err => {
                console.log(`Couldn't create project: ${err}`);
            });
    };
    return state;
}