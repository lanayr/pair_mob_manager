import React, { Component } from 'react';
import './App.css';
import Timer from './Timer.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <h1 className="App-intro">
          The Goat House 
        </h1>
        <PairMobArea />
      </div>
    );
  }
}

function shuffle(array) {  
  var ctr = array.length, temp, index;  

  while (ctr > 0) {  
    index = Math.floor(Math.random() * ctr);  
    ctr--;  
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
      mobbers: [],
      mobbingInterval: '15',
      numberOfMobbers: '',
      position: 0,
      driver: '',
      navigator: '',
      startTime: '',
      remainingTime: '',
      displayTime: '',
      display: false,
      isCountDown: true
    };

    this.handleMobbingInterval = this.handleMobbingInterval.bind(this);
    this.handleNames = this.handleNames.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
  }

  alertBox(driver, navigator) {
    alert("New driver: " + driver + "\nNew navigator: " + navigator);
  }

  switchDriverNavigator() {
    let driver = this.state.mobbers[this.state.position] 
    if (this.state.numberOfMobbers > this.state.position +1) {
      let navigator = this.state.mobbers[this.state.position +1] 

      this.alertBox(driver, navigator);
      this.setState({driver: driver});
      this.setState({navigator: navigator});
      this.setState({position: this.state.position + 1});
      this.setState({startTime: new Date()});
      this.setState({remainingTime: ''});
      this.setState({isCountDown: true});
    } else {
      let navigator = this.state.mobbers[0] 

      this.alertBox(driver, navigator);
      this.setState({driver: driver});
      this.setState({navigator: navigator});
      this.setState({position: 0});
      this.setState({startTime: new Date()});
      this.setState({remainingTime: ''});
      this.setState({isCountDown: true});
    }
  }

  startCountDown() {
    if (this.state.isCountDown === true)  {
      let rTime = this.getRemainingTime();
      this.setState({remainingTime: rTime});
      this.setState({displayTime: this.displayTime(rTime)});
    } else {
      let rTime = (this.state.remainingTime - 1000);
      this.setState({displayTime: this.displayTime(rTime)});
      this.setState({remainingTime: rTime});
    }
  }

  getRemainingTime(){
    return ((this.state.mobbingInterval * 60000) - (new Date() - Date.parse(this.state.startTime)));
   };

  displayTime(t){
    let seconds = Math.floor( (t/1000) % 60 );
    let minutes = Math.floor( (t/1000/60) % 60 );
    let hours = Math.floor( (t/(1000*60*60)) % 24 );
    let days = Math.floor( t/(1000*60*60*24) );
    return {
      'total': t,
      'days': days,
      'hours': hours,
      'minutes': minutes,
      'seconds': seconds
   };
} 


  handleNames(event) {
    this.setState({names: event.target.value});
  }

  handleMobbingInterval(event) {
    this.setState({mobbingInterval: event.target.value});
  }

  handleSubmit() {
    if (this.state.names === '' || null) {
      alert("Please enter mobber names") ;
    } else if (this.state.mobbingInterval === '' || null) {
      alert("Please enter mobbing interval");
    } else if (isNaN(this.state.mobbingInterval)) {
      alert("Please enter number only for mobbing interval") ;
    } else {
      let mobbers = shuffle(splitNames(this.state.names)); 
      this.setState({numberOfMobbers: mobbers.length});
      this.setState({mobbers: mobbers});
      this.setState({driver: mobbers[0]});
      this.setState({navigator: mobbers[1]});
      this.setState({display: true});
      this.setState({position: 1});
      this.setState({startTime: new Date()});
      this.setState({isCountDown: true});
      this.timerID = setInterval(
        () => this.startCountDown(), 1000);
      this.timerIdInterval = setInterval(
        () => this.switchDriverNavigator(),
        (this.state.mobbingInterval * 60000)
      );
    }
  }

  handleStop() {
    this.setState({numberOfMobbers: ''});
    this.setState({mobbers: []});
    this.setState({driver: ''});
    this.setState({navigator: ''});
    this.setState({position: 0});
    this.setState({remainingTime: ''});
    this.setState({startTime: ''});
    this.setState({mobbingInterval: this.state.mobbingInterval});
    clearInterval(this.timerID);
    clearInterval(this.timerIdInterval);
    this.setState({display: false});
  }

  handlePause() {
    this.setState({isCountDown: false});
    alert("Click OK to continue mobbing") ;
  }

  render() {
    return (
      <div>
        <label>
          Enter Names:
          <input className="inputField" type="text" value={this.state.names} onChange={this.handleNames} />
          Enter Mobbing Interval (minutes):
          <input className="inputField" type="text" value={this.state.mobbingInterval} onChange={this.handleMobbingInterval} />
        </label>
        <button className='Start' onClick={this.handleSubmit}>
          Start
        </button>
        <button className='Pause' onClick={this.handlePause}>
          Pause
        </button>
        <button className='Stop' onClick={this.handleStop}>
          Stop
        </button>
        <Display className='Display' display={this.state.display} driver={this.state.driver} navigator={this.state.navigator}/>
        <Timer timeLeft={this.state.displayTime} />
      </div>
    );
  }
}

function Display(props) {
  const isDisplayOn = props.display
  if (isDisplayOn)  {
    return (
      <table className="Display">
        <tbody>
          <tr>
            <th className="Driver">Driver</th>
            <th className="Navigator">Navigator</th> 
          </tr>
          <tr>
            <td>{props.driver}</td>
            <td>{props.navigator}</td>
          </tr>
          </tbody>
      </table>
    );
  } else {
    return (
      <div></div>
    );
  }
}

export default App;
