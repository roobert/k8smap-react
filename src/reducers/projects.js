const projectsInitialState = [
  {
    name: "bw-test0",
    clusters: [
      {
        name:   "cluster0",
        region: "europe-west1",
        zone:   "b",
        nodes:  [],
        pods:   []
      }
    ]
  },
  {
    name: "bw-dev-vizia0",
    clusters: [
      {
        name:   "bw-dev-vizia0",
        region: "europe-west1",
        zone:   "b",
        nodes:  [],
        pods:   []
      }
    ]
  }
]

export default function projects(
  state = projectsInitialState,
	action
) {
  switch (action.type) {
    case 'UPDATE_NODES':
      console.log(state);

      state.forEach(function(project) {
        if (project.name === action.payload.project) {
          project.clusters.forEach(function(cluster) {
            if ((cluster.region === action.payload.clusterRegion) &&
               (cluster.zone   === action.payload.clusterZone) &&
               (cluster.name   === action.payload.cluster)) {
              cluster['nodes'] = action.payload.data;
              console.log("found nodes to update");
            }
          });
        }
      });

      return state;

    case 'UPDATE_PODS':
      console.log(state);

      state.forEach(function(project) {
        if (project.name === action.payload.project) {
          project.clusters.forEach(function(cluster) {
            if ((cluster.region === action.payload.clusterRegion) &&
               (cluster.zone   === action.payload.clusterZone) &&
               (cluster.name   === action.payload.cluster)) {
              cluster['pods'] = action.payload.data;
              console.log("found pods to update");
            }
          });
        }
      });

      return state;

    default:
      return state;
  }
}
