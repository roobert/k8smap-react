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

const fetchFromAPI = (clusterPath, apiPath, version = 'stable') => {
  const url = `${server}${clusterPath}${getAPIPath(version)}${apiPath}`

  console.log(`fetching: ${url}`);

  return fetch(url, {
    mode: "no-cors",
    method: "GET"
  }).then(function(response) {
    if (response.headers.get("content-type").indexOf("application/json") !== -1) {
      return response.json();
    } else {
      throw new TypeError(`response from url was not type application/json: ${url}`);
    }
  });
}

function projectsAction(type, project, clusterRegion, clusterZone, cluster, data) {
  return {
    type: type,
    payload: {
       project:       project,
       cluster:       cluster,
       clusterRegion: clusterRegion,
       clusterZone:   clusterZone,
       data: data
    },
  };
}

const dispatchAction = (store, apiPath, project, cluster, clusterRegion, clusterZone) => data => {
  switch(apiPath) {
    case('nodes'):
      var nodes = projectsAction('UPDATE_NODES', project, clusterRegion, clusterZone, cluster, data)
      return store.dispatch(nodes);

    case('pods'):
      var pods = projectsAction('UPDATE_PODS', project, clusterRegion, clusterZone, cluster, data);
      return store.dispatch(pods);

    default:
      console.log(`unknown api path: ${apiPath}`)
  }
}

const updaters = (data, store) => {
  console.log("updating state");

  var apiPaths = [ "nodes", "pods" ];

  data.forEach(project => {
    project.clusters.forEach(cluster => {
      apiPaths.forEach(apiPath => {
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
