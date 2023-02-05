import { StateMapObject, MutableStateMap } from '@aldinh777/reactive/collection';
import { has } from '@aldinh777/toolbox/object/validate';

interface SimpleObject<T> {
    [key: string]: T;
}
export type StateMapProxy<T> = MutableStateMap<T> & SimpleObject<T>;

export const statemap = <T>(map: StateMapObject<T> | Map<string, T>): StateMapProxy<T> =>
    new Proxy(new MutableStateMap(map), {
        get(target, p, receiver) {
            if (!has(target, p as string)) {
                if (typeof p === 'string') {
                    return target.get(p);
                }
            }
            return Reflect.get(target, p, receiver);
        },
        set(target, p, value, receiver) {
            if (!has(target, p as string)) {
                if (typeof p === 'string') {
                    target.set(p, value);
                    return true;
                }
            }
            return Reflect.set(target, p, value, receiver);
        }
    }) as StateMapProxy<T>;
