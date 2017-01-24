export default function pods(state = [], action) {
  switch (action.type) {
    case 'SET_PODS':
      return action.state;
    default:
      return state
  }
}
