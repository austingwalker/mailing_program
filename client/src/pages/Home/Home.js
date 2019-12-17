import React, { Component } from "react";
import API from "../../utils/API";
import Form from "../../components/Form";


class Home extends Component {
  state = {
    test: {},
  };

  // componentDidMount() {
  //   API.getTest()
  //     .then(res =>
  //       this.setState({ test: res.data})
  //     )
  //     .catch(err => console.log(err));
  // }

  

  render() {
    return (
      <div>
        <Form/>
      </div>
    );
  }
}

export default Home;
