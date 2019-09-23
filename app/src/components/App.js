import React from 'react';
import APICaller from '../APICaller';

const App = () => {
  APICaller.signIn('test2', 't2')
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
  return <div>This is the starting place</div>;
};

export default App;
