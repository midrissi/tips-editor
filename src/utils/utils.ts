import { set } from 'lodash';

export type ObjectType = {
  [key: string]: any;
};

export const flattenObj = (object: ObjectType): ObjectType => {
  // The object which contains the
  // final result
  const result: ObjectType = {};

  // loop through the object "ob"
  for (const i in object) {
    // We check the type of the i using
    // typeof() function and recursively
    // call the function again
    if (typeof object[i] === 'object' && !Array.isArray(object[i])) {
      const temp = flattenObj(object[i]);
      for (const j in temp) {
        // Store temp in result
        result[i + '.' + j] = temp[j];
      }
    }

    // Else store ob[i] in result directly
    else {
      result[i] = object[i];
    }
  }
  return result;
};

export const unflattenObj = (object: ObjectType): ObjectType => {
  const result: ObjectType = {};

  for (const attr in object) {
    set(result, attr, object[attr]);
  }

  return result;
};
