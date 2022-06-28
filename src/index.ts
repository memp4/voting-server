import { Map, List } from 'immutable';
import { setEntries } from './core';

const map = setEntries(Map(), ['hello', 'good bye']);

console.log(map.get('entries'));