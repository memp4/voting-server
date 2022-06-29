import Immutable, { Map, fromJS, List } from 'immutable';
import { expect } from 'chai';

import reducer from '../src/reducer';

import { Action } from '../src/reducer';

describe('reducer', () => {
    it('handles SET_ENTRIES', () => {
        const initialState: Map<string, any> = Map();
        const action: Action = { type: 'SET_ENTRIES', content: ['Tenet'] };
        const nextState = reducer(initialState, action);

        const check = Immutable.is(nextState, fromJS({
            entries: ['Tenet']
        }));

        expect(check).to.be.true;
    });

    it('handles NEXT', () => {
        const initialState: Map<string, any> = Map({
            entries: List(['Tenet', 'Inglorious Bastards'])
        });
        const action: Action = { type: 'NEXT' };
        const nextState = reducer(initialState, action);

        const check = Immutable.is(nextState, fromJS({
            vote: {
                pair: ['Tenet', 'Inglorious Bastards']
            },
            entries: []
        }));

        expect(check).to.be.true;
    });

    it('handles VOTE', () => {
        const initialState: Map<string, any> = Map({
            vote: Map({
                pair: List(['Tenet', 'Inglorious Bastards']),
            }),
            entries: List()
        });
        const action: Action = { type: 'VOTE', content: 'Tenet' };
        const nextState = reducer(initialState, action);
        const check = Immutable.is(nextState, fromJS({
            vote: {
                pair: ['Tenet', 'Inglorious Bastards'],
                tally: { 'Tenet': 1 }
            },
            entries: []
        }));

        expect(check).to.be.true;
    });
});