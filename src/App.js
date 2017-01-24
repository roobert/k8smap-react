// redux

function k8s(state = {}, action) {
  switch (action.type) {
    case 'UPDATE':
      console.log(`updating state for path: ${action.path}`);
      state[action.path] = action.state
      return state;

    default:
      console.log("fetching state");
      return state;
  }
}

import { createStore } from 'redux';

function storeCreator() {
  if (process.env.NODE_ENV !== "production") {
    return createStore(k8s, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());
  } else {
    return createStore(k8s)
  }
}

var store = storeCreator()

// react

import React, { Component } from 'react';
import './App.css';

var server = "http://localhost/kubernetes/"

// main

function fetchFromAPI(path, version: "stable") {
  function APIPath(version) {
    switch(version) {
      case 'beta':
        return "apis/extensions/v1beta1/"
      case 'stable':
        return "api/v1/"
      default:
        return "api/v1/"
    }
  }

  let url = `${server}${APIPath(version)}${path}`;

  fetch(url,
    {
      mode: "no-cors",
      method: "GET"
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    store.dispatch({
      type:  `UPDATE`,
      path:  path,
      state: data
    });
  });
}

class StoreUpdater extends Component {
  constructor(props) {
    super(props);
    this.path = props.path;
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    fetchFromAPI(this.path);
  }

  render() { return null }
}

class PageUpdater extends Component {
  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 5000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    console.log("updating page?");
    podsJSON();
    console.log("page updated?");
  }

  render() { return null }
}

function pruneContainerJSON(container) {
  let running = (("running" in container.ready.hasOwnProperty) === false);

  return {
    name:    container.name,
    running: running,
    ready:   container.ready,
    image:   container.image
  }
}

function prunePodJSON(pod) {
  let containers = [];

  for (var key in pod.status.containerStatuses) {
    if (pod.status.containerStatuses.hasOwnProperty(key)) {
      containers.push(pruneContainerJSON(pod.status.containerStatuses[key]))
    }
  }

  return {
    name:       pod.metadata.name,
    namespace:  pod.metadata.namespace,
    labels:     pod.metadata.labels,
    nodeName:   pod.spec.nodeName,
    state:      pod.status.phase,
    containers: containers
  }
}

function podsJSON() {
  let data = store.getState();
  //let pods = data["pods"];
  let pods = data;
  console.log("podsJSON!!!")

  //console.log(JSON.stringify(pods));

  //if (pods) {
  //  for (var key in pods.items) {
  //    if (pods.items.hasOwnProperty(key)) {
  //      pods.push(prunePodJSON(pods.items[key]))
  //    }
  //  }
  //}

  return pods
}

class Pods extends Component {
  render() {
    console.log("calling Pods");
    return <div>{JSON.stringify(podsJSON())}</div>
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <StoreUpdater path="nodes" />
        <StoreUpdater path="pods" />
        <Pods />
        <PageUpdater />
      </div>
    );
  }
}

export default App;
