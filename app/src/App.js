import React, { Component } from 'react';
import './App.css';
import { subscribeToTimer, socket } from './util/socket';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      timestamp: 'no timestamp yet',
      value: '',
      username: '',
      isTextAreaDisabled: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.emitUsername = this.emitUsername.bind(this);
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
    socket.on('get users', users => {
      console.log(users);
    });
  }

  handleChange(event) {
    socket.emit('chat message', event.target.value);
  }

  emitUsername() {
    socket.emit('add user', this.state.username);
    this.setState({ username: '', isTextAreaDisabled: false });
  }

  render() {
    return (
      <div className="App">
        <div>
          <div style={{ textAlign: 'center' }}>Please Enter your username</div>
          <input
            type="text"
            value={this.state.username}
            onChange={e => this.setState({ username: e.target.value })}
          />
          <button onClick={this.emitUsername}>Submit</button>
        </div>
        <textarea
          disabled={this.state.isTextAreaDisabled}
          className="text-area"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
        />
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute' }}>1</div>
          <div style={{ position: 'absolute' }}>2</div>
        </div>
      </div>
    );
  }
}

export default App;
