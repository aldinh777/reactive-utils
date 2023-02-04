import { MutableStateList } from '@aldinh777/reactive/collection';

export interface StateListProxy<T> extends MutableStateList<T> {
    [index: number]: T;
}

export const statelist = <T>(list: T[]): StateListProxy<T> =>
    new Proxy(new MutableStateList(list), {
        get(target, p, receiver) {
            if (typeof p === 'string') {
                const index = parseInt(p);
                if (Number.isInteger(index)) {
                    return target.get(index);
                }
            }
            return Reflect.get(target, p, receiver);
        },
        set(target, p, value, receiver) {
            if (typeof p === 'string') {
                const index = parseInt(p);
                if (Number.isInteger(index)) {
                    target.set(index, value);
                    return true;
                }
            }
            return Reflect.set(target, p, value, receiver);
        }
    }) as StateListProxy<T>;
