import { fromObject, withCase } from './fromObject';
import PropTypes from 'prop-types';

describe('fromObject', () => {
  it('should contain specified tags', () => {
    const Actions = fromObject({
      Submit: PropTypes.any
    });

    expect(Object.keys(Actions)).toEqual(['Submit']);
  });

  it('should expose action creators', () => {
    const Actions = fromObject({
      Submit: PropTypes.any
    });

    expect(Actions.Submit).toBeInstanceOf(Function);
  });

  it('should return an action creator, which can produce an action', () => {
    const Actions = fromObject({
      Submit: PropTypes.any
    });

    expect(Actions.Submit()).toMatchObject({ type: 'Submit' });
  });

  it('should return an action creator, which can produce an action', () => {
    const Actions = fromObject({
      Submit: PropTypes.string.isRequired
    });

    expect(Actions.Submit('Hello!')).toMatchObject({ type: 'Submit' });
  });
});
