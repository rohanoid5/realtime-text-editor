import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/authAction';

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  render() {
    console.log(this.props.authentication);
    return (
      <div>
        Login
        <button
          onClick={() => {
            console.log('Clicked');
            this.props.loginUser('test3', 't32');
          }}
        >
          CLICK TO LOGIN
        </button>
      </div>
    );
  }
}

const mapStateToProps = ({ authentication }) => ({ authentication });

const mapDispatchToProps = dispatch => {
  return bindActionCreators(
    {
      loginUser
    },
    dispatch
  );
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Login);
