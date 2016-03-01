import Project from './schemas/Project';

export const REQUEST_PROJECTS = 'REQUEST_PROJECTS';
function requestProjects() {
    return {
        type: REQUEST_PROJECTS
    }
};

export const RECEIVE_PROJECTS = 'RECEIVE_PROJECTS';
function receiveProjects(projects) {
    return {
        type: RECEIVE_PROJECTS,
        projects
    }
};

export function fetchProjects() {
    return function (dispatch) {
        dispatch(requestProjects());

        return Project.find()
            .then(projects => dispatch(receiveProjects(projects)));
    }
};

export const GET_PROJECT = 'GET_PROJECT';
export function getProject(project) {
    return {
        type: GET_PROJECT,
        project
    }
};

export const CREATE_PROJECT = 'CREATE_PROJECT';
export function createProject(project) {
    return {
        type: CREATE_PROJECT,
        project
    }
};

