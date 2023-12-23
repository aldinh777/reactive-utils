import { State } from '@aldinh777/reactive';
import { pushNonExists } from '@aldinh777/toolbox/array/operation';

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

const ROOT_LIST = new WeakMap<State, State[]>();

function filterDependency(states: State[]) {
    const dependencies: State[] = [];
    for (const dep of states) {
        if (ROOT_LIST.has(dep)) {
            const rl = ROOT_LIST.get(dep)!;
            for (const root of rl) {
                pushNonExists(dependencies, root);
            }
        } else {
            pushNonExists(dependencies, dep);
        }
    }
    return dependencies;
}

export const observe = <T>(...states: State<T>[]) => {
    const dependencies = filterDependency(states);
    return (handler: (...values: T[]) => any) => {
        const exec = () => handler(...states.map((s) => s.getValue()));
        for (const dep of dependencies) {
            dep.onChange(exec);
        }
        exec();
    };
};

export const stateFrom = <T>(...states: State<T>[]) => {
    const dependencies = filterDependency(states);
    return <U>(handler: (...values: T[]) => U) => {
        const s = state<U>();
        const exec = () => (s.value = handler(...states.map((s) => s.getValue())));
        for (const dep of dependencies) {
            dep.onChange(exec);
        }
        exec();
        ROOT_LIST.set(s, dependencies);
        return s;
    };
};
