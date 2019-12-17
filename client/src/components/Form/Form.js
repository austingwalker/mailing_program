import React, { Component } from "react";
import API from "../../utils/API";
// import { Link } from "react-router-dom";


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
      <div>
        <form>
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
          {/* <div className="form-check">
            <input className="form-check-input" type="checkbox" value="all" id="defaultCheck1" onChange={this.handleCheck}/>
            <label className="form-check-label" htmlFor="defaultCheck1">
              All
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="homenowtest@gmail.com" id="defaultCheck2" checked={}onChange={this.handleCheck}/>
            <label className="form-check-label" htmlFor="defaultCheck2">
              homenowtest@gmail.com
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="homenowtest@outlook.com" id="defaultCheck3" onChange={this.handleCheck}/>
            <label className="form-check-label" htmlFor="defaultCheck3">
            homenowtest@outlook.com
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="homenowtest@yahoo.com" id="defaultCheck4" onChange={this.handleCheck}/>
            <label className="form-check-label" htmlFor="defaultCheck4">
            homenowtest@yahoo.com
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="homenowtest@aol.com" id="defaultCheck5" onChange={this.handleCheck}/>
            <label className="form-check-label" htmlFor="defaultCheck5">
            homenowtest@aol.com
            </label>
          </div>
          <div className="form-check">
            <input className="form-check-input" type="checkbox" value="homenowtest@homenow.io" id="defaultCheck6" onChange={this.handleCheck}/>
            <label className="form-check-label" htmlFor="defaultCheck6">
            homenowtest@homenow.io
            </label>
          </div> */}
          <button type="submit" className="btn btn-primary addBtn" onClick={this.handleFormSubmit}>Email</button>
        </form>
      </div>
    );
  }
}

export default Form;
