export function has(obj: any, keys: string[]): boolean {
    return typeof obj === 'object' && keys.every((key) => Reflect.has(obj, key));
}

export function isState(item: any): boolean {
    return has(item, ['addListener', 'onChange', 'getValue', 'setValue']);
}

export function isMutable(item: any): boolean {
    return has(item, ['set']);
}

export function isCollection(item: any): boolean {
    return has(item, ['raw', 'get', 'trigger', 'onUpdate', 'onInsert', 'onDelete']);
}

export function isList(item: any): boolean {
    return isCollection(item) && item.raw instanceof Array;
}

export function isMap(item: any): boolean {
    return isCollection(item) && item.raw instanceof Map;
}
