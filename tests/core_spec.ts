import Immutable, { List, Map } from 'immutable';
import { expect } from 'chai';

const { setEntries, next, vote } = require('../src/core');

describe('app logic', () => {
    describe('setEntries(), return store with changed entries', () => {
        it('is setEntries() return correct data', () => {
            const state = Map();
            const entries = ['Squid Game', 'The Machinist'];
            const nextState = setEntries(state, entries);

            const check = Immutable.is(nextState, Map({
                entries: List.of('Squid Game', 'The Machinist')
            }));

            expect(check).to.be.true;
        });
    });

    describe('next(), return store with vote branch and new pair', () => {
        it('return new store with voting pair', () => {
            const entries = List(['Squid Game', 'The Machinist', 'American Hustle']);
            const state = Map({
                entries: entries
            });
            const nextState = next(state);

            const check = Immutable.is(nextState, Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist')
                }),
                entries: List.of('American Hustle')
            }));

            expect(check).to.be.true;
        });
        it('gets winner and pushes in the end of list, then goes to next voting pair', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist'),
                    tally: Map({
                        'Squid Game': 4,
                        'The Machinist': 2
                    })
                }),
                entries: List.of('Shrek', 'Fight Club', 'Forrest Gump')
            });

            const nextState = next(state);
            const check = Immutable.is(nextState, Map({
                vote: Map({
                    pair: List.of('Shrek', 'Fight Club'),
                }),
                entries: List.of('Forrest Gump', 'Squid Game')
            }));

            expect(check).to.be.true;
        });

        it('draw pushes both elements in the end of list, then goes to next voting pair', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist'),
                    tally: Map({
                        'Squid Game': 2,
                        'The Machinist': 2
                    })
                }),
                entries: List.of('Shrek', 'Fight Club', 'Forrest Gump')
            });

            const nextState = next(state);
            const check = Immutable.is(nextState, Map({
                vote: Map({
                    pair: List.of('Shrek', 'Fight Club'),
                }),
                entries: List.of('Forrest Gump', 'Squid Game', 'The Machinist')
            }));

            expect(check).to.be.true;
        });

        it('when one entry left makes it winner', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist'),
                    tally: Map({
                        'Squid Game': 3,
                        'The Machinist': 2
                    })
                }),
                entries: List()
            });
            const nextState = next(state);

            const check =Immutable.is(nextState, Map({
                winner: 'Squid Game'
            }));

            expect(check).to.be.true;
        });

    });

    describe('vote(), return redux store with tallies', () => {
        it('adds new tally property in vote branch', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist')
                }),
                entries: List()
            });

            const nextState = vote(state, 'Squid Game');

            const check = Immutable.is(nextState, Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist'),
                    tally: Map({
                        'Squid Game': 1
                    })
                }),
                entries: List()
            }));

            expect(check).to.be.true;
        });

        it('adds 1 point to existing tally property', () => {
            const state = Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist'),
                    tally: Map({
                        'Squid Game': 2,
                        'The Machinist': 3
                    })
                }),
                entries: List()
            });
            const nextState = vote(state, 'Squid Game');

            const check = Immutable.is(nextState, Map({
                vote: Map({
                    pair: List.of('Squid Game', 'The Machinist'),
                    tally: Map({
                        'Squid Game': 3,
                        'The Machinist': 3
                    })
                }),
                entries: List()
            }));

            expect(check).to.be.true;
        });
    });
});