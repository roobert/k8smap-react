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
      console.log("updating..");

      let projects = state.map(() => project, {
        if (project.name          == params.project) &&
           (project.clusterRegion == params.clusterRegion) &&
           (project.clusterZone   == params.clusterZone) &&
           (project.cluster       == paramscluster) {
           project[params.path] = params.data;
         }
         return project;
      }
      return projects;

    default:
      return state;
  }
}
