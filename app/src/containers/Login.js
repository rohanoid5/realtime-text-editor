import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { loginUser } from '../actions/authAction';
import Login from '../components/Login';
import { TOKEN } from '../util/constants';

class LoginContainer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      token: ''
    };
  }

  componentDidUpdate() {
    const { authentication } = this.props;
    if (authentication.token && authentication.token !== '') {
      localStorage.setItem(TOKEN, authentication.token);
      this.props.setLoggedIn(true);
    }
  }

  render() {
    return (
      <Login
        loginInitiated={this.props.authentication.initiated}
        authenticate={this.props.loginUser}
      />
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
)(LoginContainer);
