import { StateList } from '@aldinh777/reactive/collection/StateList';
import { ListViewFiltered } from '@aldinh777/reactive/collection/view/ListViewFiltered';

export function filterview<T>(
    list: StateList<T>,
    filter: (item: T) => boolean
): ListViewFiltered<T> {
    return new ListViewFiltered(list, filter);
}
