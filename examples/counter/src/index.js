import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { fromObject, withCase } from 'algebraic-actions';
import PropTypes from 'prop-types';

const Actions = withCase(fromObject({
  Increment: PropTypes.any,
  Decrement: PropTypes.any,
  DecrementBy: PropTypes.number
}));

const reducer = Actions.case({
  Increment: state => state + 1,
  Decrement: state => state - 1,
  DecrementBy: (state, number) => state - number,
  _: (state = 0) => state
});

const store = createStore(reducer);
const rootEl = document.getElementById('root');

const Counter = ({ onIncrement, onDecrement, onDecrementBy, value }) => {
  return (
    <div>
      <button onClick={onIncrement}>Increment</button>
      <div>{ value }</div>
      <button onClick={onDecrement}>Decrement</button>
      <button onClick={onDecrementBy}>Decrement By 10</button>
    </div>
  )
};

const render = () => ReactDOM.render(
  <Counter
    value={store.getState()}
    onIncrement={() => store.dispatch(Actions.Increment())}
    onDecrement={() => store.dispatch(Actions.Decrement())}
    onDecrementBy={() => store.dispatch(Actions.DecrementBy(10))}
  />,
  rootEl
);

render();
store.subscribe(render);
