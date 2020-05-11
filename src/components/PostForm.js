import React, { Component } from 'react'
import axios from 'axios'

const emailRegex = RegExp(
    /^([a-zA-Z0-9_\-.]+)@([a-zA-Z0-9_\-.]+).([a-zA-Z]{2,5})$/
  );
  
  const formValid = ({ formErrors, ...rest }) => {
    let valid = true;
  
    // validate form errors being empty
    Object.values(formErrors).forEach(val => {
      val.length > 0 && (valid = false);
    });
  
    // validate the form was filled out
    Object.values(rest).forEach(val => {
      (val === null && val !== undefined) && (valid = false);
    });
  
    return valid;
  };

 class PostForm extends Component {

    constructor(props) {
        super(props)
    
        this.state = {
             userId: '',
             title: '',
             body: '',
             emailId: '',
             formErrors: {
                userId: "",
                title: "",
                body: "",
                emailId: ""
              }
        };
    }
    
changeHandler = (e) => {
    e.preventDefault();
    const { name, value } = e.target;
    let formErrors = { ...this.state.formErrors };
    
    switch (name) {
        case "userId":
          formErrors.userId =
            value.length < 3 && !value.required ? "minimum 3 characaters required" : "";
          break;
        case "title":
          formErrors.title =
            value.length < 3 ? "minimum 3 characaters required" : "";
          break;
        case "body":
          formErrors.body =
            value.length < 6 ? "minimum 6 characaters required" : "";
        break;
        case "emailId":
          formErrors.emailId = emailRegex.test(value)
            ? ""
            : "Please enter a valid email id";
          break;
        
        default:
          break;
      }
  
      this.setState({ formErrors, [name]: value }, () => console.log(this.state));
}

isFormValid = () => {
    const {userId, title, body, emailId} = this.state
  
    return userId && title && body && emailId
  }

submitHandler = e => {
     e.preventDefault();
     if (formValid(this.state)) {
        console.log(`
          --SUBMITTING--
          UserId: ${this.state.userId}
          Title: ${this.state.title}
          Body: ${this.state.body}
          EmailId: ${this.state.emailId}
        `);

     axios.post('https://jsonplaceholder.typicode.com/posts', this.state).then(response => {
         console.log(response)
         alert("SuccessFully Posted the Content", {response})
     }).catch(error => {
         console.log(error)
         
     })

      } else {
        console.error("FORM INVALID - DISPLAY ERROR MESSAGE");
        
      }
}
    render() {
        const { formErrors } = this.state;
        return (
            <div className="wrapper">
            <div className="form-wrapper"> 
                <h1>Create Content</h1>
                <form onSubmit = {this.submitHandler} autoComplete = 'off' noValidate>
                    <div className = "userId">
                        <label htmlFor = "userId">User Id</label>
                        <input className = {formErrors.userId.length  > 0 ? "error": null} type = 'text' name = 'userId' placeholder = 'User id' required onChange = {this.changeHandler}></input>
                        {formErrors.userId.length > 0 && (
                            <span className="errorMessage">{formErrors.userId}</span>
                        )}
                    </div>
                    <div className = 'title'> 
                        <label htmlFor = 'title'>Title </label>
                        <input className = {formErrors.title.length  > 0 ? "error": null} type = 'text' name = 'title' placeholder = 'title' noValidate onChange = {this.changeHandler}></input>
                        {formErrors.title.length > 0 && (
                            <span className="errorMessage">{formErrors.title}</span>
                        )}
                    </div>
                    <div className = 'body'> 
                        <label htmlFor = 'body'>Body</label>
                        <input className = {formErrors.body.length  > 0 ? "error": null} type = 'text' name = 'body' placeholder = 'body' noValidate onChange = {this.changeHandler}></input>
                        {formErrors.body.length > 0 && (
                            <span className="errorMessage">{formErrors.body}</span>
                        )}
                    </div>

                    <div className = 'emailId'> 
                        <label htmlFor = 'emailId'>Email Id</label>
                        <input className = {formErrors.emailId.length  > 0 ? "error": null} type = 'text' name = 'emailId' placeholder = 'emailId' noValidate onChange = {this.changeHandler}></input>
                        {formErrors.emailId.length > 0 && (
                            <span className="errorMessage">{formErrors.emailId}</span>
                        )}
                    </div>


                    <div className = 'createAccount'>
                    <button type = 'submit' disabled = {!this.isFormValid()}>Submit</button>
                   
                    </div>
                   
                </form>
            </div>
            </div>
        )
    }
}

export default PostForm
