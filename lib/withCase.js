function caseHandlerCreator(union) {
  return handlers => {
    const tags = Object.keys(union);
    const uncovered = tags.reduce(
      (acc, curr) =>
        typeof handlers[curr] === 'undefined' ? [...acc, curr] : acc,
      []
    );

    if (uncovered.length > 0 && typeof handlers._ === 'undefined') {
      throw new Error(
        `Case is not covering "${uncovered.join(
          '", "'
        )}" and does not have a default handler e.g. Actions.case({ _: state => state })`
      );
    }

    return (state, action) => {
      return handlers[action.type]
        ? handlers[action.type](state, action.payload)
        : handlers._(state, action.payload);
    };
  };
}

export function withCase(union) {
  Object.defineProperty(union, 'case', {
    enumerable: false,
    writable: false,
    configurable: false,
    value: caseHandlerCreator(union)
  });

  return union;
}
