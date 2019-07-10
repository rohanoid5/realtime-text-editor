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
      cache: '',
      isTextAreaDisabled: true
    };

    this.handleChange = this.handleChange.bind(this);
    this.emitUsername = this.emitUsername.bind(this);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleKeyDown = this.handleKeyDown.bind(this);
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
      let { value } = this.state;
      let { start, end } = data;
      let newVal = '';
      if (data.value) {
        if (start > 0) {
          newVal =
            value.length > 0
              ? value.substring(0, start) +
                data.value +
                value.substring(start, value.length)
              : data.value;
        } else {
          newVal = data.value + value;
        }
        this.setState({ value: newVal }, () => {
          this.refs.input.selectionStart = this.refs.input.selectionEnd =
            start + 1;
        });
      } else {
        if (start === end) {
          newVal = value.length > 0 ? value.substring(0, end - 1) : '';
        } else if (start < end) {
          newVal =
            value.length > 0
              ? value.substring(0, start) + value.substring(end, value.length)
              : '';
        }
        this.setState({ value: newVal }, () => {
          this.refs.input.selectionStart = this.refs.input.selectionEnd =
            start + 1;
        });
      }
    });
    socket.on('get users', users => {
      console.log(users);
    });
  }

  handleChange(e) {
    // socket.emit('chat message', event.target.value);
    // console.log(e.target.selectionStart);
  }

  emitUsername() {
    socket.emit('add user', this.state.username);
    this.setState({ username: '', isTextAreaDisabled: false });
  }

  handleKeyPress(e) {
    let value = e.key;
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    socket.emit('chat message', { value, start, end });
  }

  handleKeyDown(e) {
    let start = e.target.selectionStart;
    let end = e.target.selectionEnd;
    if (e.keyCode === 8) {
      socket.emit('chat message', { start, end });
    }
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
          <button onClick={() => {}}>Enter</button>
        </div>
        <textarea
          // disabled={this.state.isTextAreaDisabled}
          ref="input"
          className="text-area"
          type="text"
          value={this.state.value}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onKeyDown={this.handleKeyDown}
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
