import { StateList, ListViewMapped } from '@aldinh777/reactive/collection';

export function mapview<S, T>(
    list: StateList<S>,
    mapper: (item: S) => T,
    remapper?: (item: S, value: T) => void
): ListViewMapped<S, T> {
    return new ListViewMapped(list, mapper, remapper);
}
