export default function nodes(state = [], params) {
  switch (params.type) {
    case 'SET_NODES':
      state[params.project][params.clusterRegion][params.clusterZone][params.cluster][params.path] = params.data
      return state;

    default:
      return state;
  }
}
