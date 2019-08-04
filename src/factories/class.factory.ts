function createClass<T>(type: (new (...arg: any[]) => T), ...args: any[]): T {
    return new type(...args);
}

export {
    createClass
};
