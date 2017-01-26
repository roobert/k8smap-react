export const server = "http://localhost"

const getAPIPath = version => {
  switch(version) {
    case 'beta':
      return "apis/extensions/v1beta1/"
    case 'stable':
      return "api/v1/"
    default:
      return "api/v1/"
  }
}

const fetchFromAPI = (clusterPath, path, version = 'stable') =>
  fetch(`${server}${clusterPath}${getAPIPath(version)}${path}`, {
    mode: "no-cors",
    method: "GET"
  })
  .then(response => response.json());

const dispatchAction = (store, action, project, cluster, clusterRegion, clusterZone) => data => {
  const apiPath = action.split("_")[1].toLowerCase();

  store.dispatch({
    type:          action,
    apiPath:       apiPath,
    data:          data,
    project:       project,
    cluster:       cluster,
    clusterRegion: clusterRegion,
    clusterZone:   clusterZone
  });
}

const updaters = (data, store) => {
  console.log("updating state");

  var apiPaths = [ "pods", "nodes" ];

  data.forEach(project => {
    console.log(`project: ${project["name"]}`)

    project.clusters.forEach(cluster => {
      console.log(`cluster: ${cluster["name"]}`)

      apiPaths.forEach(apiPath => {
        let clusterPath = `/k8s/${project.name}/${cluster.region}/${cluster.zone}/${cluster.name}/`;

        let action = `SET_${apiPath.toUpperCase()}`

        fetchFromAPI(clusterPath, apiPath)
          .then(dispatchAction(store, action, project.name, cluster.name, cluster.region, cluster.zone));
      });
    });
  });
}

export const storeUpdater = (store, data, interval) => {
  let seconds = interval * 1000;

  setInterval(function() { updaters(data, store) }, seconds);
}
