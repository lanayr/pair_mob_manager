import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <p className="App-intro">
          Pair and Mob Manager 
        </p>
        <Session />
      </div>
    );
  }
}

function shuffle(array) {  
  var ctr = array.length, temp, index;  
  
  // While there are elements in the array  
  while (ctr > 0) {  
  // Pick a random index  
    index = Math.floor(Math.random() * ctr);  
  // Decrease ctr by 1  
    ctr--;  
  // And swap the last element with it  
     temp = array[ctr];  
     array[ctr] = array[index];  
     array[index] = temp;  
  }  
  return array;
}

function splitNames(names) {
  var newNames = []
  newNames = names.split(', ')
  return newNames;
}

class Session extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: '',
      driver: '',
      navigator: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }


  handleChange(event) {
    this.setState({value: event.target.value});
  }

  handleSubmit() {
    this.setState({driver: shuffle(splitNames(this.state.value))[0]});
    this.setState({navigator: shuffle(splitNames(this.state.value))[1]});
  }

  render() {
    return (
      <div>
        <label>
          Enter Names:
          <input type="text" value={this.state.value} onChange={this.handleChange} />
        </label>
        <Driver value={this.state.driver}/>
        <Navigator value={this.state.navigator}/>
        <button className='start' onClick={this.handleSubmit}>
          Start
        </button>
      </div>
    );
  }
}

class Driver extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p className="Driver">
          The driver is: {this.props.value} 
        </p>
      </div>
    );
  }
}

class Navigator extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div>
        <p className="Navigator">
          The navigator is: {this.props.value} 
        </p>
      </div>
    );
  }
}

export default App;
