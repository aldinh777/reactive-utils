import { StateList, ListViewMapped } from '@aldinh777/reactive/collection';

export const maplist = <S, T>(
    list: StateList<S>,
    mapper: (item: S) => T,
    remapper?: (item: S, value: T) => void
): ListViewMapped<S, T> => new ListViewMapped(list, mapper, remapper);
