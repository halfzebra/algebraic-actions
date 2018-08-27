import PropTypes from 'prop-types';

function actionCreatorFactory(type, payloadTypes) {
  return function(payload) {
    if (
      process.env.NODE_ENV === 'test' ||
      process.env.NODE_ENV === 'development'
    ) {
      PropTypes.checkPropTypes(
        type,
        ...payloadTypes,
        `"${type}"`,
        'Action Tag Name'
      );
    }
    return { type, payload };
  };
}

export function fromObject(tagMap) {
  return Object.keys(tagMap).reduce((acc, tag) => {
    return { ...acc, [tag]: actionCreatorFactory(tag, tagMap[tag]) };
  }, {});
}
