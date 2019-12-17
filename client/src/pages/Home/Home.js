import React, { Component } from "react";
import Form from "../../components/Form";
import "./Home.css";


class Home extends Component {
  state = {
    test: {},
  };

  render() {
    return (
      <div id="homeBox">
        <Form/>
      </div>
    );
  }
}

export default Home;
