export default function projects(
  state = [
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
  ],
  params
) {
  switch (params.type) {
    case 'UPDATE':
      console.log("updating store");
      let projects = state;

      return state.map(project => {
        if (project.name === params.project) {
          return project.clusters.map(cluster => {
            if ((cluster.region === params.clusterRegion) &&
               (cluster.zone   === params.clusterZone) &&
               (cluster.name   === params.cluster)) {
               cluster[params.apiPath] = params.data;
            }
            return Object.assign({}, cluster);
          });
        }
        return Object.assign({}, project);
      });

    default:
      return state;
  }
}
