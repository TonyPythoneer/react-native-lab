/*
 * The source code from `object-assign`
 * But the package can't support typescript now,
 * so I convert the syntax from es5 to es6.
 * Now it's availble working on tpyescript!
 */
const hasOwnProperty = Object.prototype.hasOwnProperty;
const propIsEnumerable = Object.prototype.propertyIsEnumerable;


function toObject(val): Object {
    if (val === null || val === undefined) {
        throw new TypeError('Object.assign cannot be called with null or undefined');
    }
    return Object(val);
}


export default function(target: Object, ...sources: Object[]) {
    let to: Object = toObject(target);
    for (let i: number = 0, len = sources.length; i < len; i++) {
        let s = Object(sources[i]);
        for (let key in s) {
            if (hasOwnProperty.call(s, key)) { to[key] = s[key]; }
        }
    }
    return to;
};
