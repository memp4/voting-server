import { Map, List } from 'immutable';

// Define type for Redux store branches?
// interface ReduxStore = {}
type AnyMap = Map<string, any>

export function setEntries(state: AnyMap, entries: string[]): AnyMap {
    return state.set('entries', List(entries));
}

function getWinners(vote: AnyMap): string[] {
    if (!vote) return [];
    const [a, b] = vote.get('pair');
    const aVotes = vote.getIn(['tally', a], 0) as number;
    const bVotes = vote.getIn(['tally', b], 0) as number;
    if (aVotes > bVotes) return [a];
    else if (aVotes < bVotes) return [b];
    else return [a, b];
}

export function next(state: AnyMap): AnyMap {
    const entries = state.get('entries').concat(getWinners(state.get('vote')));
    if (entries.size === 1) {
        return state.remove('vote')
            .remove('entries')
            .set('winner', entries.first());
    } else {
        return state.merge({
            vote: Map({ pair: entries.take(2) }),
            entries: entries.skip(2) //returns List with undefined values
        });
    }
}

export function vote(state: AnyMap, entry: string): AnyMap {
    return state.updateIn(['vote', 'tally', entry], 0, (tally) => tally as number + 1);
}