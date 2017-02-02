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

function projectsAddPods(project, clusterRegion, clusterZone, cluster, pods) {
  return {
    //type: 'UPDATE_PODS',
    //payload: {
    //   id: `${project}_${region}_${zone}_${cluster}`,
    //   data: pods,
    //},
    type: 'UPDATE_PODS',
    payload: {
       project:       project,
       cluster:       cluster,
       clusterRegion: clusterRegion,
       clusterZone:   clusterZone,
       data: pods
    },
	};
}

function projectsAddNodes(project, clusterRegion, clusterZone, cluster, nodes) {
  console.log("projectsAddNodes")
  console.log(project);
  console.log(clusterRegion);

  return {
    //payload: {
    //   id: `${project}_${region}_${zone}_${cluster}`,
    //   data: nodes,
    //},
    type: 'UPDATE_NODES',
    payload: {
       project:       project,
       cluster:       cluster,
       clusterRegion: clusterRegion,
       clusterZone:   clusterZone,
       data: nodes
    },
	};
}

const fetchFromAPI = (clusterPath, path, version = 'stable') =>
  fetch(`${server}${clusterPath}${getAPIPath(version)}${path}`, {
    mode: "no-cors",
    method: "GET"
  })
  .then(response => response.json());

const dispatchAction = (store, apiPath, project, cluster, clusterRegion, clusterZone) => data => {
  console.log("dispatching");

  switch(apiPath) {
    case('nodes'):
      var nodes = projectsAddNodes(project, clusterRegion, clusterZone, cluster, nodes)
      console.log(nodes);
      return store.dispatch(nodes);

    case('pods'):
      var pods = projectsAddPods(project, clusterRegion, clusterZone, cluster, data);
      console.log(pods);
      return store.dispatch(pods);

    default:
      console.log(`unknown api path: ${apiPath}`)
  }

  //store.dispatch({
  //  type:          'UPDATE',
  //  apiPath:       apiPath,
  //  data:          data,
  //  project:       project,
  //  cluster:       cluster,
  //  clusterRegion: clusterRegion,
  //  clusterZone:   clusterZone
  //});
}

const updaters = (data, store) => {
  console.log("updating state");

  var apiPaths = [ "nodes", "pods" ];

  data.forEach(project => {
    console.log(`project: ${project["name"]}`)

    project.clusters.forEach(cluster => {
      console.log(`cluster: ${cluster["name"]}`)

      apiPaths.forEach(apiPath => {
        console.log(`updating path: ${apiPath}`);

        let clusterPath = `/k8s/${project.name}/${cluster.region}/${cluster.zone}/${cluster.name}/`;

        fetchFromAPI(clusterPath, apiPath)
          .then(dispatchAction(store, apiPath, project.name, cluster.name, cluster.region, cluster.zone));
      });
    });
  });
}

export const storeUpdater = (store, data, interval) => {
  let seconds = interval * 1000;

  setInterval(function() { updaters(data, store) }, seconds);
}
