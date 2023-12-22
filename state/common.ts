import { Subscription } from '@aldinh777/reactive/helper/subscription-helper';
import { state, StateProxy } from '.';

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
): [StateProxy<string>, Subscription] => {
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
