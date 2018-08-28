// @flow
import PropTypes from 'prop-types';

/**
 * @param {any} obj The object to inspect.
 * @returns {boolean} True if the argument appears to be a plain object.
 */
function isPlainObject(obj: any) {
  if (typeof obj !== 'object' || obj === null) return false;

  let proto = obj;
  while (Object.getPrototypeOf(proto) !== null) {
    proto = Object.getPrototypeOf(proto);
  }

  return Object.getPrototypeOf(obj) === proto;
}

function actionCreatorFactory(tag, payloadType) {
  return function(payload) {
    if (
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'development'
    ) {
      PropTypes.checkPropTypes(
        { payload: payloadType },
        { payload },
        `"${tag}" action payload`
      );
    }
    return { type: tag, payload };
  };
}

export function fromObject(tagMap: { [tag: string]: () => any }) {
  if (!isPlainObject(tagMap)) {
    throw new Error(
      'Please pass an object to `fromObject` for creating a union.'
    );
  }

  const tags = Object.keys(tagMap);

  if (tags.length === 0) {
    throw new Error('Please add at least one tag to the union.');
  }

  return Object.keys(tagMap).reduce((acc, tag) => {
    return { ...acc, [tag]: actionCreatorFactory(tag, tagMap[tag]) };
  }, {});
}
