
import React, { useState } from 'react';
import * as yup from 'yup';
import { Button } from 'reactstrap';


const ValidationForm = (props) => {

  const { placeholder, value, passwordholder } = props;
  const [inputStateValue, updateInputValue] = useState(value);
  const checkValidation = (event) =>{
    event.preventDefault()
    console.log("in submit");
    let schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
  });
  schema
    .isValid({
        username : inputStateValue,
        password : "inputState"
    })
    .then(function(valid) {
      console.log(valid);
    });
}

  
  return (
  <center>
    <form onSubmit={checkValidation}>
    username :<input 
      type='text'
      name="username"
      placeholder={placeholder}
      onChange={ (event) => { updateInputValue(event.target.value)}}
      value={inputStateValue}
    />
    <br/>
    password :<input 
      type='password'
      name="password"
      placeholder={passwordholder}
      value="mypassword"
      
    />
    <br/>
    <Button type='submit' color="danger">login</Button>
    </form>
    already user?<a href="JoshTe.js">click here to register</a>
    </center>
  )
};


ValidationForm.defaultProps = {
  errorMesage: null,
  placeholder: 'Please enter your name',
  passwordholder : 'please enter password',
  value: 'Default value'
};


export default ValidationForm;
