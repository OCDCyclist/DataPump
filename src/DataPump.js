const axios = require('axios');
const randomWords = require('random-words');

class DataPump {
  constructor(sourceName, tartgetURL, pumpDataFunction) {
    this.state = {
      sourceName: sourceName,
      tartgetURL: tartgetURL,
      rate: null
    };
    this.count = 0;
    this.pumpDataFunction = pumpDataFunction;
    this. intervalID = 0;
  }

  getState() {
    return Object.assign( {}, this.state, { count: this.count, status: this.intervalID === 0 ? 'stopped' : 'running'} );
  };

  setState( obj ){
    const stateKeys = Object.keys( this.state);
    Object.keys( obj).forEach( thisKey =>{
      if( stateKeys.includes(thisKey) ){
        if( this.state[thisKey] !== obj[thisKey] ){
          this.state[thisKey] = obj[thisKey];
        }
      }
    });
    return this.getState();
  };

  Start(rate) {
    this.setState( {rate: rate})
    this.intervalID = setInterval(async () => {
      this.count += 1;
      this.pumpDataFunction( this.count, (new Date()).getTime() );
    }, this.state.rate);
    return this.getState();
  }

  Stop() {
    if (this.intervalID !== 0) {
      clearInterval(this.intervalID);
      this.intervalID = 0;
      this.setState( {rate: null})
    }
    return this.getState();
  }
}

module.exports = { DataPump };
