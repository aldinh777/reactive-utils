import { subscribeAll, Subscription } from '@aldinh777/reactive/helper/subscription-helper';
import { State, ChangeHandler } from '@aldinh777/reactive';

export type MultiChangeHandler<T> = (values: T[]) => any;

export interface StateProxy<T = any> extends State<T> {
    value: T;
}

export const state = <T>(initial?: T): StateProxy<T> => {
    const o = new State(initial);
    return Object.defineProperties(o, {
        value: {
            get(): T {
                return o.getValue();
            },
            set(value: T) {
                o.setValue(value);
            }
        }
    }) as StateProxy<T>;
};

export const observe = <T>(state: State<T>, handler: ChangeHandler<T>): Subscription => {
    const subscription = state.onChange(handler);
    const value = state.getValue();
    handler(value, value);
    return subscription;
};

export const observeAll = <T>(states: State<T>[], handler: MultiChangeHandler<T>): Subscription => {
    const subscriptions = states.map((s) =>
        s.onChange(() => handler(states.map((s) => s.getValue())))
    );
    handler(states.map((s) => s.getValue()));
    return subscribeAll(subscriptions);
};

export const stateObserve = <T, U>(
    st: State<T>,
    handler: (value: T) => U
): [StateProxy<U>, Subscription] => {
    const s: StateProxy<U> = state();
    const sub = observe(st, (value) => s.setValue(handler(value)));
    return [s, sub];
};

export const stateObserveAll = <T, U>(
    states: State<T>[],
    handler: (values: T[]) => U
): [StateProxy<U>, Subscription] => {
    const s: StateProxy<U> = state();
    const sub = observeAll(states, (values) => s.setValue(handler(values)));
    return [s, sub];
};
