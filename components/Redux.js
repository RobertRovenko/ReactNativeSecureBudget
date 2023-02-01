function counterReducer(state = { count: 0 }, action) {
  switch (action.type) {
    case "counter/increment":
      return { count: state.count + 1 };
    case "counter/decrement":
      return { count: state.count - 1 };
    default:
    // throw error
  }
}
