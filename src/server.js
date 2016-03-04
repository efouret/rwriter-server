import Server from 'socket.io';
import {addProject} from './actions';

export function startServer(store) {
  const io = new Server().attach(8090);

  store.subscribe(
    () => io.emit('state', store.getState().toJS())
  );

  io.on('connection', (socket) => {
    socket.emit('state', store.getState().toJS());
    socket.on('action', action => {
        switch (action.type) {
            case 'ADD_PROJECT':
                store.dispatch(addProject(action.currentProject));
                break;
            default:
                store.dispatch(action);
        }

    });
  });
}
