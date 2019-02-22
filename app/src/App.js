import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer, socket } from './util/socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      value: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    subscribeToTimer((err, timestamp) => {
      if (!err) {
        this.setState({
          timestamp
        });
      }
    });
    socket.on('chat message', data => {
      this.setState({ value: data });
    });
  }

  handleChange(event) {
    socket.emit('chat message', event.target.value);
  }

  render() {
    return (
      <div className="App">
        <textarea
          className="text-area"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default App;
