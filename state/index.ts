import {
    createMultiSubscriptions,
    Subscription
} from '@aldinh777/reactive/helper/subscription-helper';
import { State, ChangeHandler, StateSubscription } from '@aldinh777/reactive';

export type MultiChangeHandler<T> = (values: T[]) => any;
export type MultiStateSubscription<T> = Subscription<State<T>[], MultiChangeHandler<T>>;

export interface StateProxy<T> extends State<T> {
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

export const observe = <T>(state: State<T>, handler: ChangeHandler<T>): StateSubscription<T> => {
    const subscription = state.onChange(handler);
    const value = state.getValue();
    handler(value, value);
    return subscription;
};

export const observeAll = <T>(
    states: State<T>[],
    handler: MultiChangeHandler<T>
): MultiStateSubscription<T> => {
    const subscriptions = states.map((s) =>
        s.onChange(() => handler(states.map((s) => s.getValue())))
    );
    handler(states.map((s) => s.getValue()));
    return createMultiSubscriptions(states, handler, subscriptions);
};

export const stateObserve = <T, U>(
    st: State<T>,
    handler: (value: T) => U
): [StateProxy<U>, StateSubscription<T>] => {
    const s: StateProxy<U> = state();
    const sub = observe(st, (value) => s.setValue(handler(value)));
    return [s, sub];
};

export const stateObserveAll = <T, U>(
    states: State<T>[],
    handler: (values: T[]) => U
): [StateProxy<U>, MultiStateSubscription<T>] => {
    const s: StateProxy<U> = state();
    const sub = observeAll(states, (values) => s.setValue(handler(values)));
    return [s, sub];
};

type ToggleOutput = [state: StateProxy<boolean>, open: Function, close: Function, toggle: Function];
export const stateToggle = (initial: boolean): ToggleOutput => {
    const s = state(initial);
    const open = () => s.setValue(true);
    const close = () => s.setValue(false);
    const toggle = () => s.setValue(!s.getValue());
    return [s, open, close, toggle];
};

export const stateLocalStorage = (
    key: string,
    initial: string
): [StateProxy<string>, StateSubscription<string>] => {
    const s = state(initial);
    const local = localStorage.getItem(key);
    if (local) {
        s.setValue(local);
    } else {
        localStorage.setItem(key, s.getValue());
    }
    const sub = s.onChange((value) => localStorage.setItem(key, value));
    return [s, sub];
};
