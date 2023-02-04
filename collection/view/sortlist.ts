import { StateList, ListViewSorted } from '@aldinh777/reactive/collection';

export const sortlist = <T>(
    list: StateList<T>,
    sorter?: (item: T, elem: T) => boolean
): ListViewSorted<T> => new ListViewSorted(list, sorter || ((item, compare) => item < compare));
