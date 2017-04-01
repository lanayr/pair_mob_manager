import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-intro">
          Pair/Mob Manager 
        </h1>
        <PairMobArea />
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
  newNames = names.split(/[ ,]+/)
  return newNames;
}

class PairMobArea extends Component {
  constructor(props) {
    super(props);
    this.state = {
      names: '',
      time: 10,
      numberOfMobbers: '',
      index: 0,
      driver: '',
      navigator: '',
      display: false
    };

    this.handleTime = this.handleTime.bind(this);
    this.handleNames = this.handleNames.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
  }

  switchDriverNavigator() {
    if (this.state.numberOfMobbers > this.state.index +1) {
      this.setState({driver: this.state.names[this.state.index]});
      this.setState({navigator: this.state.names[this.state.index + 1]});
      this.setState({index: this.state.index + 1});
    } else {
      this.setState({driver: this.state.names[this.state.index]});
      this.setState({navigator: this.state.names[0]});
      this.setState({index: 0});
    }
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  handleNames(event) {
    this.setState({names: event.target.value});
  }

  handleTime(event) {
    this.setState({time: event.target.value});
  }

  handleSubmit() {
    let shuffledNames = shuffle(splitNames(this.state.names)); 
    this.setState({numberOfMobbers: shuffledNames.length});
    this.setState({names: shuffledNames});
    this.setState({driver: shuffledNames[0]});
    this.setState({navigator: shuffledNames[1]});
    this.setState({display: true});
    this.setState({index: 1});
    this.timerID = setInterval(
      () => this.switchDriverNavigator(),
      (this.state.time * 1000)
    );
  }

  handleCancel() {
    this.setState({numberOfMobbers: ''});
    this.setState({names: ''});
    this.setState({driver: ''});
    this.setState({navigator: ''});
    this.setState({display: false});
    this.setState({index: 0});
    clearInterval(this.timerID);
  }

  render() {
    return (
      <div classNames='Form'>
        <label>
          Enter Names:
          <input className="inputField" type="text" value={this.state.names} onChange={this.handleNames} />
          Enter Time Interval:
          <input className="inputField" type="text" value={this.state.time} onChange={this.handleTime} />
        </label>
        <button className='Start' onClick={this.handleSubmit}>
          Start
        </button>
        <button className='Cancel' onClick={this.handleCancel}>
          Cancel
        </button>
        <Display className='Display' display={this.state.display} driver={this.state.driver} navigator={this.state.navigator}/>
        <Clock />
      </div>
    );
  }
}

function Display(props) {
  const isDisplayOn = props.display
    if (isDisplayOn)  {
      return (
        <table className='Display'>
          <tr>
            <th>Driver</th>
            <th>Navigator</th> 
          </tr>
          <tr>
            <td>{props.driver}</td>
            <td>{props.navigator}</td>
          </tr>
        </table>
      );
    }
    return (
      <div>
      </div>
    );
}

class Clock extends React.Component {
  constructor(props) {
    super(props);
    this.state = {date: new Date()};
  }

  componentDidMount() {
      this.timerID = setInterval(
        () => this.tick(),
        1000
      );
  }

  componentWillUnmount() {
    clearInterval(this.timerID);
  }

  tick() {
    this.setState({
      date: new Date()
    });
  }  

  render() {
    return (
      <div>
        <h2>It is {this.state.date.toLocaleTimeString()}.</h2>
      </div>
    );
  }
}

export default App;
