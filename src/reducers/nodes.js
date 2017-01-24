export default function nodes(state = [], action) {
  switch (action.type) {
    case 'SET_NODES':
      return action.state;
    default:
      return state
  }
}
