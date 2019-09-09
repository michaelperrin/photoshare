import React, { Component } from "react";
import "./App.css";
import Upload from "./upload/Upload";
import Album from "./containers/Album";

class App extends Component {
  render() {
    return (
      <div className="App">
        <div className="Card">
          <Upload />
          <Album />
        </div>
      </div>
    );
  }
}

export default App;
