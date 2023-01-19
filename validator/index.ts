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

export function isState(item: any): item is State<unknown> {
    return has(item, ['addListener', 'onChange', 'getValue', 'setValue']);
}

export function isCollection(item: any): item is StateCollection<any, any, any> {
    return has(item, ['raw', 'get', 'trigger', 'onUpdate', 'onInsert', 'onDelete']);
}

export function isMutable<K, V, R>(
    item: StateCollection<K, V, R>
): item is MutableStateCollection<K, V, R> {
    return has(item, ['set']);
}

export function isList(item: any): item is StateList<any> {
    return isCollection(item) && item.raw instanceof Array;
}

export function isMap(item: any): item is StateMap<any> {
    return isCollection(item) && item.raw instanceof Map;
}
