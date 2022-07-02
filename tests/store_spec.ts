import Immutable, { List, Map, fromJS } from "immutable";
import { expect } from "chai";

import makeStore from '../src/store';

describe('store', () => {
    it('store initializing', () => {
        const store = makeStore();
        const check = Immutable.is(store.getState(), Map());

        expect(check).to.be.true;
    });

    it('Store dispatch function', () => {
        const store = makeStore();
        store.dispatch({type: 'SET_ENTRIES', content: ['Tenet', 'Shrek']});
        const check = Immutable.is(store.getState(), fromJS({
            entries: ['Tenet', 'Shrek']
        }));

        expect(check).to.be.true;
    });
});