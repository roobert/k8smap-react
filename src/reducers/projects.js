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

//const projectsInitialState = {}

export default function projects(
  state = projectsInitialState,
	action
) {
  switch (action.type) {
    case 'UPDATE_PODS':
      console.log("updating pods")

      return state.map(project => {
        console.log(`found pods iteration: ${JSON.stringify(project)}`);

        if (project.name === action.payload.project) {
          console.log("found pods project to update");
          return project.clusters.map(cluster => {
            if ((cluster.region === action.payload.clusterRegion) &&
               (cluster.zone   === action.payload.clusterZone) &&
               (cluster.name   === action.payload.cluster)) {
               cluster['pods'] = action.payload.data;
            }
            console.log("found pods to update");
            return Object.assign({}, cluster);
          });
        }
        return Object.assign({}, project);
      });

      //return state;

      //return {
      //  ...state,
      //  pods: {
      //    ...state.pods,
      //    [action.payload.id]: action.payload.data,
      //  },
      //};
      //return store[action.payload.project]

    case 'UPDATE_NODES':
      console.log("updating nodes")

      return state.map(project => {

        if (project.name === action.payload.project) {

          return project.clusters.map(cluster => {
            if ((cluster.region === action.payload.clusterRegion) &&
               (cluster.zone   === action.payload.clusterZone) &&
               (cluster.name   === action.payload.cluster)) {
               cluster['nodes'] = action.payload.data;
            }
            console.log("found nodes to update");
            return Object.assign({}, cluster);
          });
        }
        return Object.assign({}, project);
      });
      //return {
      //  ...state,
      //  nodes: {
      //    [action.payload.id]: action.payload.data,
      //  },
      //};

      //console.log("updating store");
      //let projects = state;

      //return state.map(project => {
      //  if (project.name === params.project) {
      //    return project.clusters.map(cluster => {
      //      [params.clusterRegion]

      //      if ((cluster.region === params.clusterRegion) &&
      //         (cluster.zone   === params.clusterZone) &&
      //         (cluster.name   === params.cluster)) {
      //         cluster[params.apiPath] = params.data;
      //      }
      //      return Object.assign({}, cluster);
      //    });
      //  }
      //  return Object.assign({}, project);
      //});
      //return state;

    default:
      return state;
  }
}
