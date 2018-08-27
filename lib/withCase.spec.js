import { fromObject } from './fromObject';
import PropTypes from 'prop-types';
import { withCase } from './withCase';

describe('withCase', () => {
  it('should compose a union with a `case` method', () => {
    const Actions = withCase(
      fromObject({
        Submit: PropTypes.any
      })
    );

    expect(Actions.case).toBeInstanceOf(Function);
  });

  it('case should return a function', () => {
    const Actions = withCase(
      fromObject({
        Submit: PropTypes.any
      })
    );

    expect(
      Actions.case({
        Submit: () => 'Submitted!'
      })
    ).toBeInstanceOf(Function);
  });

  it('should throw if case is not covering all tags', () => {
    const Actions = withCase(
      fromObject({
        Submit: PropTypes.any,
        Update: PropTypes.any
      })
    );

    expect(() =>
      Actions.case({
        Submit: () => 'Submitted!'
      })
    ).toThrow(
      `Case is not covering "Update" and does not have a default handler e.g. Actions.case({ _: state => state })`
    );
  });

  it('should not throw if only default handler is present', () => {
    const Actions = withCase(
      fromObject({
        Submit: PropTypes.any,
        Update: PropTypes.any
      })
    );

    expect(() =>
      Actions.case({
        _: () => 'Default!'
      })
    ).not.toThrow();
  });

  it('should run a default handler, when unknow actions are executed', () => {
    const Actions = withCase(
      fromObject({
        Submit: PropTypes.any
      })
    );

    const reducer = Actions.case({
      _: () => 'Default!'
    });

    expect(reducer(null, Actions.Submit())).toEqual('Default!');
  });
});
