import { combineReducers } from 'redux-immutable';
import {List, Map} from 'immutable';
import {REQUEST_PROJECTS, RECEIVE_PROJECTS, GET_PROJECT, CREATE_PROJECT} from './actions';
import Project from './schemas/Project';

/*
state = {
    projects: [],
    currentProject : {}
}

*/

/*
const INITIAL_STATE = Map();

function setProjects(state, projects) {
  const list = List(projects);
  return state.set('projects', list)
              .set('initialProjects', list);
}

function getProject(state, project) {
    return state.set('project', project);
}

function createProject(state, project) {
    console.log('BEGIN createProject');
    dispatch => {
        console.log('BEGIN createProject async');
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

function reducer(state = INITIAL_STATE, action) {
    console.log(`state=${state}, action=${action}`);
  switch (action.type) {
    case 'SET_PROJECTS':
        return setProjects(state, action.projects);
    case 'GET_PROJECT':
        return getProject(state, action.project);
    case 'CREATE_PROJECT':
        return createProject(state, action.project);
  }
  return state;
}
*/

function projects(state = List(), action) {
    switch (action.type) {
        case REQUEST_PROJECTS:
            return state;
        case RECEIVE_PROJECTS:
            return List(action.projects);
        default:
            return state;
    }
}

function currentProject(state = Map(), action) {
    switch (action.type) {
        case CREATE_PROJECT:

        default:
            return state;
    }
}

const rootReducer = combineReducers({
    projects,
    currentProject
});

export default rootReducer