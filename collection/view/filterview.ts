import { StateList, ListViewFiltered } from '@aldinh777/reactive/collection';

export function filterview<T>(
    list: StateList<T>,
    filter: (item: T) => boolean
): ListViewFiltered<T> {
    return new ListViewFiltered(list, filter);
}
