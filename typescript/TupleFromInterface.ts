type Lookup<T, K> = K extends keyof T ? T[K] : never;
type TupleFromInterface<T, K extends Array<keyof T>> = { [I in keyof K]: Lookup<T, K[I]> }
