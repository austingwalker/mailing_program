import React, { Component } from "react";
import API from "../../utils/API";
import {Row, Col} from 'reactstrap';
import "./Form.css"


class Form extends Component {
  state = {
    emailType: [
      {name: "All", isChecked: false},
      {name: "homenowtest@gmail.com", isChecked: false}, 
      {name: "homenowtest@outlook.com", isChecked: false},
      {name: "homenowtest@yahoo.com", isChecked: false},
      {name: "homenowtest@aol.com", isChecked: false},
      {name: "homenowtest@homenow.io", isChecked: false},
    ]
  };

  handleCheck = event => {
    let emailType = this.state.emailType
    emailType.forEach(type => {
      if(type.name === event.target.value)
      type.isChecked = event.target.checked
     })
    this.setState({emailType: emailType})
   }

  handleFormSubmit = e => {
    e.preventDefault()
    let arr = []
    const  all = ['homenowtest@gmail.com', 'homenowtest@outlook.com', 'homenowtest@yahoo.com', 'homenowtest@aol.com', 'homenowtest@homenow.io']
    let allSelected = false;
      let chosenTypes = this.state.emailType
      chosenTypes.map(type => {
        if(type.name === 'All' && type.isChecked){
          arr = all
          allSelected = true;
        }
        else if (!allSelected && type.isChecked)
          arr.push(type.name)
      })
      this.sendEmail(arr)
    console.log(arr)
  }

  sendEmail = (arr) => {
    API.email({
      email: arr
    })
      .then(res => {
        console.log(res)
        this.setState({
          emailType: [
            {name: "All", isChecked: false},
            {name: "homenowtest@gmail.com", isChecked: false}, 
            {name: "homenowtest@outlook.com", isChecked: false},
            {name: "homenowtest@yahoo.com", isChecked: false},
            {name: "homenowtest@aol.com", isChecked: false},
            {name: "homenowtest@homenow.io", isChecked: false},
          ]
        })
      })
  }
  

  render() {
    return (
      <div id="formBox">
        <Row>
          <Col className="col" md="3"/>
          <Col className="col formCol" md="6">
            <form id="form">
              <label id="label">Select one or more address's to email:</label>
              {
                this.state.emailType.map((type, i) => {
                return( <div className="form-check">
                    <input className="form-check-input" type="checkbox" value={type.name} id={`check${i}`} checked={type.isChecked} onChange={this.handleCheck}/>
                    <label className="form-check-label" htmlFor={`check${i}`}>
                      {type.name}
                    </label>
                  </div>
                )})
              }
              <button type="submit" className="btn btn-primary emailBtn" onClick={this.handleFormSubmit}>Email</button>
            </form>
          </Col>
          <Col className="col" md="3"/>
        </Row>
      </div>
    );
  }
}

export default Form;
