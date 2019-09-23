import { LOCAL_BASE_URL, AUTHENTICATION, SIGNIN } from '../util/constants';

const jsonify = res => res.json();

const signIn = (username, password) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  const fetchData = {
    method: 'POST',
    body: JSON.stringify({
      username,
      password
    }),
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_BASE_URL + AUTHENTICATION + SIGNIN, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

export default {
  signIn
};
