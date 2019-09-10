import React from 'react';
import './App.css';
import Upload from './upload/Upload';
import Album from './containers/Album';

const App = () => (
  <div className="App">
    <div className="Card">
      <Upload />
      <Album />
    </div>
  </div>
);

export default App;
