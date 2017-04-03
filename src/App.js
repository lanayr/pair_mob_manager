import React, { Component } from 'react';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-intro">
          Pair/Mob Space 
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
      startTime: '',
      remainingTime: '',
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
      alert('New driver is: ' + this.state.names[this.state.index] + 
            "\nNew navigator is: " + this.state.names[this.state.index +1]);
      this.setState({index: this.state.index + 1});
      this.setState({startTime: new Date()});
    } else {
      this.setState({driver: this.state.names[this.state.index]});
      this.setState({navigator: this.state.names[0]});
      alert('New driver is: ' + this.state.names[this.state.index] +
            "\nNew navigator is: " + this.state.names[0]);
      this.setState({index: 0});
      this.setState({startTime: new Date()});
    }
  }

  setRemainingTime() {
    var rTime = this.getRemainingTime(new Date());
    this.setState({remainingTime: rTime});
  }

  getRemainingTime(endtime){
    var t = Date.parse(endtime) - Date.parse(this.state.startTime);
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
   };
} 

  componentWillUnmount() {
    clearInterval(this.timerID);
    clearInterval(this.timerIdInterval);
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
    this.setState({startTime: new Date()});
    this.timerID = setInterval(
      () => this.setRemainingTime(), 1000);
    this.timerIdInterval = setInterval(
      () => this.switchDriverNavigator(),
      (this.state.time * 60000)
    );
  }

  handleCancel() {
    this.setState({numberOfMobbers: ''});
    this.setState({names: ''});
    this.setState({driver: ''});
    this.setState({navigator: ''});
    this.setState({display: false});
    this.setState({index: 0});
    this.setState({remainingTime: ''});
    clearInterval(this.timerID);
    clearInterval(this.timerIdInterval);
  }

  render() {
    return (
      <div classNames='Form'>
        <label>
          Enter Names:
          <input className="inputField" type="text" value={this.state.names} onChange={this.handleNames} />
          Enter Time Interval(minutes):
          <input className="inputField" type="text" value={this.state.time} onChange={this.handleTime} />
        </label>
        <button className='Start' onClick={this.handleSubmit}>
          Start
        </button>
        <button className='Cancel' onClick={this.handleCancel}>
          Cancel
        </button>
        <Display className='Display' display={this.state.display} driver={this.state.driver} navigator={this.state.navigator}/>
        <Timer timeLeft={this.state.remainingTime} />
      </div>
    );
  }
}

function Display(props) {
  const isDisplayOn = props.display
    if (isDisplayOn)  {
      return (
        <table className="Display">
          <tr>
            <th className="Driver">Driver</th>
            <th className="Navigator">Navigator</th> 
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

function Timer(props) {
  const t = props.timeLeft;
  if (t)  {
  return (
    <div>
     minutes: {t.minutes} seconds: {t.seconds}
    </div>
  );
  }
  return (
    <div>
    </div>
  );
}

export default App;
