import { Map } from 'immutable';
import { setEntries, next, vote } from "./core";

const initialState: Map<string, any> = Map();

type ActionTypes = 'SET_ENTRIES' | 'NEXT' | 'VOTE';
type ActionContent = string | string[];

export interface Action {
    type: ActionTypes,
    content?: ActionContent
}

export default function reducer(state = initialState, action: Action) {
    switch(action.type) {
        case 'SET_ENTRIES':
            const entries = action.content as string[];
            return setEntries(state, entries);
        case 'NEXT':
            return next(state);
        case 'VOTE':
            const entry = action.content as string;
            return vote(state, entry);
        default:
            return state;
    }
}