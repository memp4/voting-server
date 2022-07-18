import Immutable from 'immutable';
import { Server, Socket } from 'socket.io';

import { Store } from 'redux';

export function startServer(store: Store) {
    const io = new Server().attach(3000);

    store.subscribe(
        () => io.emit('state', store.getState().toJS())
    );

    io.on('connection', (socket: Socket) => {
        socket.emit('state', store.getState().toJS());
        socket.on('action', store.dispatch.bind(store));
    });
}