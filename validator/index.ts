import { State } from '@aldinh777/reactive';
import {
    MutableStateCollection,
    StateCollection,
    StateList,
    StateMap
} from '@aldinh777/reactive/collection';

export function has(obj: any, keys: string[]): boolean {
    return typeof obj === 'object' && keys.every((key) => Reflect.has(obj, key));
}

export function isState<T>(item: any): item is State<T> {
    return has(item, ['addListener', 'onChange', 'getValue', 'setValue']);
}

export function isCollection<K, V, R>(item: any): item is StateCollection<K, V, R> {
    return has(item, ['raw', 'get', 'trigger', 'onUpdate', 'onInsert', 'onDelete']);
}

export function isMutable<K, V, R>(
    item: StateCollection<K, V, R>
): item is MutableStateCollection<K, V, R> {
    return has(item, ['set']);
}

export function isList<T>(item: any): item is StateList<T> {
    return isCollection(item) && item.raw instanceof Array;
}

export function isMap<T>(item: any): item is StateMap<T> {
    return isCollection(item) && item.raw instanceof Map;
}
