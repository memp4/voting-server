import Immutable, { Map, List, Collection } from 'immutable';

// Define type for Redux store branches?
// interface ReduxStore = {}

export function setEntries(state: Map<string, any>, entries: string[]): Map<string, any> {
    return state.set('entries', List(entries));
}

export function next(state: Map<string, any>): Map<string, any> {
    const entries = state.get('entries');
    return state.merge({
        vote: Map({ pair: entries.take(2) }),
        entries: entries.skip(2) //returns List with undefined values
    });
}

export function vote(state: Map<string, any>, entry: string): Map<string, any> {
    return state.updateIn(['vote', 'tally', entry], 0, (tally) => tally as number + 1);
}