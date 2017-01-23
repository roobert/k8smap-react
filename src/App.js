// redux
import { createStore } from 'redux';

function k8s(state = {}, action) {
  switch (action.type) {
    case 'UPDATE':
      // update state
      return state;
    default:
      return state;
  }
}

//let store = createStore(k8s)
const store = createStore(k8s, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__());


// react
import React, { Component } from 'react';
import './App.css';

var server = "http://localhost/kubernetes/"

// main

function fetchFromAPI(path, version: 'stable') {
  let APIPath = function(version) {
      switch(version) {
      case 'beta':
        return "apis/extensions/v1beta1/"
      case 'stable':
        return "api/v1/"
      default:
        return "api/v1/"
    }
  }

  let url = `${server}${APIPath}${path}`

  fetch(url,
    {
      mode: "no-cors",
      method: "GET"
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    k8s.update(data);
  });
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

function podsJSON(props) {
  let pods = []

  if (json) {
    for (var key in json.items) {
      if (json.items.hasOwnProperty(key)) {
        pods.push(prunePodJSON(json.items[key]))
      }
    }
  }

  return pods
}

class Pods extends Component {
  constructor(props) {
    super(props);
    //this.state = {text: <Data />};
  }

  componentDidMount() {
    this.timerID = setInterval(() => this.tick(), 2000);
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  //tick() {
  //  this.setState({ text: <Data /> });
  //}

//  render() {
//    return (
//      <div>{this.state.text}</div>
//    );
//  }
}

//class Pods extends Component {
//  constructor(props) {
//    super(props);
//    this.state = {text: <Data />};
//  }
//
//  componentDidMount() {
//    this.timerID = setInterval(() => this.tick(), 2000);
//  }
//
//  componentWillUnmount() {
//    clearInterval(this.timerID);
//  }
//
//  tick() {
//    this.setState({ text: <Data /> });
//  }
//
//  render() {
//    return (
//      <div>{this.state.text}</div>
//    );
//  }
//}

//class Data extends Component {
//  render() {
//    updateJSON();
//
//    return <pre>{JSON.stringify(podsJSON(), null, 2)}</pre>
//  }
//}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-fetch">
        </div>
      </div>
    );
  }
}

export default App;
