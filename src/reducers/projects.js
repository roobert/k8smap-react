import { data } from '../data';

export default function projects(
  state = data,
	action
) {
  switch (action.type) {
    case 'UPDATE_NODES':
      state.forEach(function(project) {
        if (project.name === action.payload.project) {
          project.clusters.forEach(function(cluster) {
            if ((cluster.region === action.payload.clusterRegion) &&
               (cluster.zone   === action.payload.clusterZone) &&
               (cluster.name   === action.payload.cluster)) {
              cluster['nodes'] = action.payload.data;
            }
          });
        }
      });

      return state;

    case 'UPDATE_PODS':
      state.forEach(function(project) {
        if (project.name === action.payload.project) {
          project.clusters.forEach(function(cluster) {
            if ((cluster.region === action.payload.clusterRegion) &&
               (cluster.zone   === action.payload.clusterZone) &&
               (cluster.name   === action.payload.cluster)) {
              cluster['pods'] = action.payload.data;
            }
          });
        }
      });

      return state;

    default:
      return state;
  }
}
