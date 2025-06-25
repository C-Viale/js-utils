type ClassName = string | undefined | null | Record<string, boolean | undefined> | boolean;
type Params = (ClassName | ClassName[])[];

export function classNames(...args: Params): string {
  let result = "";

  for (const arg of args) {
    if (arg == null || typeof arg === "boolean") continue;

    if (typeof arg === "string") {
      const value = arg.trim();
      if (value.length) result += `${value} `;
      continue;
    }

    if (Array.isArray(arg)) {
      const value = classNames(...arg);
      if (value.length) result += `${value} `;
      continue;
    }

    for (const key of Object.keys(arg)) {
      if (arg[key]) {
        const trimmedKey = key.trim();
        if (trimmedKey.length) result += `${trimmedKey} `;
      }
    }
  }

  return result.trim();
}
