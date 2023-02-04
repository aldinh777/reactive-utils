import { StateList, ListViewFiltered } from '@aldinh777/reactive/collection';

export const filterlist = <T>(
    list: StateList<T>,
    filter: (item: T) => boolean
): ListViewFiltered<T> => new ListViewFiltered(list, filter);
