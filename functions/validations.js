/**
 * Syntax sugar for Array.prototype.includes().
 * Verifies if value exists inside an array
 *
 * @param value A value to be verified.
 * @param tests An array of values to test
 */
export function isIn(value, tests) {
  return tests.includes(value);
}

/**
 *  Verifies if value is empty. Empty values are those below:
 *
 * '',  0,  null,  undefined,  [ ],   { }
 *
 *   This method may be used in some validations,
 *   but must be used carefully, as empty arrays and
 *   empty objects are not falsy values by default.
 * @param value
 */
export function isEmptyValue(value) {
  if (!value) return true;

  if (Array.isArray(value)) return value.length === 0;

  if (typeof value === "object") return Object.keys(value).length === 0;

  return false;
}

/**
 * Verifies if object has property value that exists in an array.
 *
 * @param object An object to be verified
 * @param property The object property to be verified
 * @param tests An array of values to test
 */
export function propertyIsEqual(object, property, tests) {
  if (isEmptyValue(object)) return false;

  for (let item of tests) if (item === object[property]) return true;

  return false;
}

/**
 * Verifies if two arrays have an element with same value.
 *
 * @param firstArray
 * @param secondArray
 */
export function hasCommonElement(firstArray, secondArray) {
  return firstArray.some((item) => secondArray.includes(item));
}
