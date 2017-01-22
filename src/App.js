import React, { Component } from 'react';
import './App.css';

var json;
var server = "http://localhost/kubernetes/"
var api = "api/v1"
var url = `${server}${api}/pods`

function updateData() {
  fetch(url,
    {
      mode: "no-cors",
      method: "GET"
  })
  .then(function(response) {
    return response.json()
  })
  .then(function(data) {
    json = JSON.stringify(data)
  });
}

class Pods extends React.Component {
  constructor(props) {
    super(props);
    updateData();
    this.state = {text: json};
  }

  componentDidMount() {
    this.timerID = setInterval(
      () => this.tick(),
      10000
    );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    updateData();
    this.setState({
      text: json
    });
  }

  render() {
    return (
      <div>
        {this.state.text}
      </div>
    );
  }
}

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="App-fetch">
        <Pods />
        </div>
      </div>
    );
  }
}

export default App;
