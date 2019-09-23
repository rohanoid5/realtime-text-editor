import React from 'react';
import { getAllDocuemnts } from '../APICaller';

const JWT =
  'JWT eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZDJlYzY2OWNhOWY2YzQxOTEyYjUxZWUiLCJ1c2VybmFtZSI6InRlc3QyIiwibmFtZSI6IlRlc3QgVHdvIiwicGFzc3dvcmQiOiIkMmEkMTAkcHZxTWFXNjFHcVlUR0l3VU1ZSEhFZURxQjZmYWRQN1FDSHozbjdqNUtEaTUzVDloUm9tSVMiLCJlbWFpbCI6InRlc3QyQHRlc3QuY29tIiwidXBkYXRlZF9hdCI6IjIwMTktMDctMTdUMDY6NTU6MzcuMzQwWiIsIl9fdiI6MCwiaWF0IjoxNTY5MjYzNDE0LCJleHAiOjE1Njk4NjgyMTR9.JN1vVK3cJcfiBUjCZ-uT75l4Ic-AD4GW9-gbhzOkOvA';

const App = () => {
  getAllDocuemnts(JWT)
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  return <div>This is the starting place</div>;
};

export default App;
