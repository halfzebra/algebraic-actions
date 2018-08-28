# algebraic-actions

A library that helps representing Redux [Actions](https://redux.js.org/basics/actions) as an [Algebraic Union Type](https://en.wikipedia.org/wiki/Algebraic_data_type) in JavaScript.

In helps to describe state transitions in a type-safe manner with exhaustive Action coverage.
## Usage

```js
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

store.dispatch(Actions.Increment())
```

## Acknowledgements

- [Elm: Custom Types](https://guide.elm-lang.org/types/custom_types.html)
- [fantasyland/daggy](https://github.com/fantasyland/daggy)
- [paldepind/union-type](https://github.com/paldepind/union-type)
