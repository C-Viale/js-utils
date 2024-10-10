type ClassName = Record<string, boolean | undefined> | string | boolean | undefined | null;
type Params = (ClassName | ClassName[])[];

export function classNames(...args: Params): string {
  return args
    .filter((arg) => typeof arg !== "boolean" && !!arg)
    .map((arg) => {
      if (Array.isArray(arg)) return classNames(...arg);

      if (typeof arg === "object" && arg != null) {
        return Object.keys(arg)
          .filter((key) => !!arg[key])
          .join(" ");
      }

      return arg;
    })
    .join(" ");
}
