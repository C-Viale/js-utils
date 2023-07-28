import { useRef, useState } from "react";

export default function useObject<Schema extends object>(
  init: Schema,
  shouldUpdate = true
): {
  state: Schema;
  setKey: <K extends keyof Schema>(key: K, value: Schema[K]) => void;
  get: <K extends keyof Schema>(key: K) => Schema[K];
} {
  const state = useRef(
    new Map<keyof Schema, Schema[keyof Schema]>(
      Object.entries(init) as [keyof Schema, Schema[keyof Schema]][]
    )
  );
  const [, forceUpdate] = useState({});

  const setKey = <K extends keyof Schema>(key: K, value: Schema[K]) => {
    state.current.set(key, value);
    shouldUpdate && forceUpdate({});
  };

  const get = <K extends keyof Schema>(key: K) => state.current.get(key) as Schema[K];

  return {
    state: Object.fromEntries(state.current) as Schema,
    setKey,
    get,
  };
}
