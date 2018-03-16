import * as _ from "lodash";
import LoggerUtils from "./LoggerUtils";

/**
 * A set of utilities for validating objects at runtime.
 */

const log = LoggerUtils.getLogger("~/util/ValidatorUtils");

/**
 * @throws if the path is unresolvable.
 * @return the resolved value
 */
export function assertExist<T>(obj: object, path: string) : T {
  if (!_.has(obj, path)) {
    log.trace(obj, `Failed to deserialize, expected object to contain ${path}.`);
    throw Error(`Failed to deserialize, expected object to contain ${path}.`);
  }

  return _.get(obj, path);
}

/**
 * @throws if the path in the object isn't resolved or not equal to the passed expected.
 * @return the resolved value
 */
export function assertEqual<T>(obj: object, path: string, expected: T) : T {
  const resolved: any = assertExist(obj, path);

  if (resolved !== expected) {
    log.trace(obj, `Failed to deserialize, expected path ${path} to resolve to ${expected}, but it resolved to ${resolved}.`);
    throw new Error(`Failed to deserialize, expected path ${path} to resolve to ${expected}, but it resolved to ${resolved}.`);
  }

  return resolved;
}

/**
 * @throws if the path is not resolvable in the object or the type of the resolved value is not equal to the passed type.
 * @return the resolved value
 */
export function assertType<T>(obj: object, path: string, type: string) : T {
  const resolved: any = assertExist(obj, path);

  if ((type === "array" && _.isArray(resolved)) || (type === "object" && _.isObject(resolved)) || (typeof resolved === type)) {
    return resolved;
  } else {
    log.trace(obj, `Failed to deserialize, expected path ${path} to resolve to type ${type}, whereas it is ${typeof resolved}.`);
    throw new Error(`Failed to deserialize, expected path ${path} to resolve to type ${type}, whereas it is ${typeof resolved}.`);
  }
}

/**
 * @throws if the type is resolvable and doesn't match the passed type parameter, unresolved is fine.
 * @return the resolved value, undefined if not resolvable
 */
export function assertTypeIfPresent<T>(obj: object, path: string, type: string) : T | undefined {
  if (!_.has(obj, path)) return undefined;
  return assertType(obj, path, type);
}