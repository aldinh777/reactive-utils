import { has } from '@aldinh777/toolbox/object/validate';
import { State } from '@aldinh777/reactive';
import {
    MutableStateCollection,
    StateCollection,
    StateList,
    StateMap
} from '@aldinh777/reactive/collection';

export const isState = <T>(item: unknown): item is State<T> =>
    has(item, 'addListener', 'onChange', 'getValue', 'setValue');

export const isCollection = <K, V, R>(item: unknown): item is StateCollection<K, V, R> =>
    has(item, 'raw', 'get', 'trigger', 'onUpdate', 'onInsert', 'onDelete');

export const isMutable = <K, V, R>(
    item: StateCollection<K, V, R>
): item is MutableStateCollection<K, V, R> => has(item, 'set');

export const isList = <T>(item: unknown): item is StateList<T> =>
    isCollection(item) && item.raw instanceof Array;

export const isMap = <T>(item: unknown): item is StateMap<T> =>
    isCollection(item) && item.raw instanceof Map;
