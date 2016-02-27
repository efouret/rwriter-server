import {setProjects, createProject, INITIAL_STATE} from './core';

export default function reducer(state = INITIAL_STATE, action) {
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
