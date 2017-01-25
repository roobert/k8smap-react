export const server = "http://localhost/kubernetes/"

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

const fetchFromAPI = (path, version = 'stable') => {
  fetch(`${server}${getAPIPath(version)}${path}`, {
    mode: "no-cors",
    method: "GET"
  })
  .then(response => response.json());
}

const dispatchAction = action => data => {
  store.dispatch({
    type:  action,
    state: data.items
  });
}

export const storeUpdater = () => {
  fetchFromAPI('pods').then(dispatchAction('SET_PODS'));
  fetchFromAPI('nodes').then(dispatchAction('SET_NODES'));
}
