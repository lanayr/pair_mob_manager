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
      mobbingInterval: '',
      numberOfMobbers: '',
      position: 0,
      driver: '',
      navigator: '',
      displayTime: '',
      isRunning: '',
      isPause: '',
      display: false,
    };

    this.handleMobbingInterval = this.handleMobbingInterval.bind(this);
    this.handleNames = this.handleNames.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleStop = this.handleStop.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleResume = this.handleResume.bind(this);
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
      this.setState({remainingTime: this.state.mobbingInterval * 60000});
    } else {
      let navigator = this.state.mobbers[0] 

      this.alertBox(driver, navigator);
      this.setState({driver: driver});
      this.setState({navigator: navigator});
      this.setState({position: 0});
      this.setState({remainingTime: this.state.mobbingInterval * 60000});
    }
  }

  countDown() {
    if (this.state.remainingTime <= 0) {
      this.switchDriverNavigator();
    } else {
      if (this.state.isPause) {
        return
      } else {
        let rTime = ((this.state.remainingTime) - 1000);
        this.setState({remainingTime: rTime});
        this.setState({displayTime: this.displayTime(rTime)});
      }
    }
  }

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

  handleSubmit(event) {
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
      this.setState({isRunning: true});
      this.setState({position: 1});
      this.setState({remainingTime: this.state.mobbingInterval * 60000});
      this.timerID = setInterval(
        () => this.countDown(), 1000);
      event.preventDefault();
    }
  }

  handleStop() {
    this.setState({display: false});
    this.setState({names: ''});
    this.setState({numberOfMobbers: ''});
    this.setState({mobbers: []});
    this.setState({driver: ''});
    this.setState({navigator: ''});
    this.setState({position: 0});
    this.setState({remainingTime: ''});
    this.setState({mobbingInterval: ''});
    this.setState({displayTime: ''});
    this.setState({isRunning: false});
    this.setState({isPause: false});
    clearInterval(this.timerID);
    clearInterval(this.timerIdInterval);
  }

  handlePause() {
    this.setState({isPause: true});
    this.setState({isRunning: false});
  }

  handleResume() {
    this.setState({isPause: false});
    this.setState({isRunning: true});
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <label>
            Enter Names:
            <input className="inputField" type="text" value={this.state.names} onChange={this.handleNames} />
            Enter Mobbing Interval (minutes):
            <input className="inputField" type="text" value={this.state.mobbingInterval} onChange={this.handleMobbingInterval} />
          </label>
          {!this.state.isRunning && !this.state.isPause ? <input type='submit' className='Start' value="Start" /> : null}
          {this.state.isRunning ? <button className='Pause' onClick={this.handlePause}>Pause</button> : null}
          {this.state.isPause ? <button className='Resume' onClick={this.handleResume}>Resume</button> : null}
          {this.state.isRunning || this.state.isPause ? <button className='Stop' onClick={this.handleStop}>Stop</button> : null}
        </form>
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
