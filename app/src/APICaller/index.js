import {
  LOCAL_BASE_URL,
  AUTHENTICATION,
  SIGNIN,
  SIGNUP,
  USERS,
  DOCUMENTS
} from '../util/constants';

const jsonify = res => res.json();
const stringify = JSON.stringify;
const POST = 'POST';
const GET = 'GET';

const signIn = (username, password) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  const fetchData = {
    method: POST,
    body: stringify({
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

const signUp = (username, name, password, email) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json'
  });
  const fetchData = {
    method: POST,
    body: stringify({
      username,
      name,
      password,
      email
    }),
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_BASE_URL + AUTHENTICATION + SIGNUP, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getAllUsers = jwt => {
  const headers = new Headers({
    Authorization: jwt
  });
  const fetchData = {
    method: GET,
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(LOCAL_BASE_URL + USERS, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getUserByUsername = (jwt, username) => {
  const headers = new Headers({
    Authorization: jwt
  });
  const fetchData = {
    method: GET,
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(`${LOCAL_BASE_URL}${USERS}/${username}`, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getAllDocuemnts = jwt => {
  const headers = new Headers({
    Authorization: jwt
  });
  const fetchData = {
    method: GET,
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(`${LOCAL_BASE_URL}${DOCUMENTS}`, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const getDocumentById = (jwt, id) => {
  const headers = new Headers({
    Authorization: jwt
  });
  const fetchData = {
    method: GET,
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(`${LOCAL_BASE_URL}${DOCUMENTS}/${id}`, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

const createDocument = (jwt, title, content) => {
  const headers = new Headers({
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization: jwt
  });
  const fetchData = {
    method: POST,
    body: stringify({
      title,
      content
    }),
    headers
  };
  return new Promise((resolve, reject) => {
    fetch(`${LOCAL_BASE_URL}${DOCUMENTS}`, fetchData)
      .then(jsonify)
      .then(data => resolve(data))
      .catch(err => reject(err));
  });
};

export {
  signIn,
  signUp,
  getAllUsers,
  getUserByUsername,
  getAllDocuemnts,
  getDocumentById,
  createDocument
};
