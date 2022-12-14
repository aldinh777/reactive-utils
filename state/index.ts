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

export function state<T>(initial: T): StateProxy<T> {
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
}

export function observe<T>(state: State<T>, handler: ChangeHandler<T>): StateSubscription<T> {
    const subscription = state.onChange(handler);
    const value = state.getValue();
    handler(value, value);
    return subscription;
}

export function observeAll<T>(
    states: State<T>[],
    handler: MultiChangeHandler<T>
): MultiStateSubscription<T> {
    const subscriptions = states.map((s) =>
        s.onChange(() => handler(states.map((s) => s.getValue())))
    );
    handler(states.map((s) => s.getValue()));
    return createMultiSubscriptions(states, handler, subscriptions);
}

export function stateObserve<T, U>(st: State<T>, handler: (value: T) => U): StateProxy<U> {
    const o: StateProxy<any> = state(undefined);
    observe(st, (value) => o.setValue(handler(value)));
    return o;
}

export function stateObserveAll<T, U>(
    states: State<T>[],
    handler: (values: T[]) => U
): StateProxy<U> {
    const o: StateProxy<any> = state(undefined);
    observeAll(states, (values) => o.setValue(handler(values)));
    return o;
}

export function stateToggle(initial: boolean) {
    const st = state(initial);
    const open = () => st.setValue(true);
    const close = () => st.setValue(false);
    const toggle = () => st.setValue(!st.getValue());
    return [st, open, close, toggle];
}

export function stateLocalStorage(key: string, initial: string) {
    const st = state(initial);
    const local = localStorage.getItem(key);
    if (local) {
        st.setValue(local);
    } else {
        localStorage.setItem(key, st.getValue());
    }
    st.onChange((value) => localStorage.setItem(key, value));
    return st;
}
