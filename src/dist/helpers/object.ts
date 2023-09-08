const extend = (target, source) => {
    if (Object.assign) {
        return Object.assign(target, source);
    } else {
        for (const key in source) {
            if (source.hasOwnProperty(key)) {
                target[key] = source[key];
            }
        }
        return target;
    }
};

const isObject = (value) => {
    const type = typeof value;
    return type === 'function' || (!!value && type === 'object');
};

export { extend, isObject };
