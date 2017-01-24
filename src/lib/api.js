const server = "http://localhost/kubernetes/"

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

export const fetchFromAPI = (path, version = 'stable') =>
  fetch(`${server}${getAPIPath(version)}${path}`, {
    mode: "no-cors",
    method: "GET"
  })
  .then(response => response.json());
