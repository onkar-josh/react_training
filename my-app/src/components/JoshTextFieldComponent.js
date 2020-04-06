import React, { useState } from 'react';

const validationStateSchema = {
  fname: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: 'Invalid first name format.',
    },
  },
  lname: {
    required: true,
    validator: {
      regEx: /^[a-zA-Z]+$/,
      error: 'Invalid last name format.',
    },
  },
  tags: {
    required: true,
    validator: {
      regEx: /^(,?\w{3,})+$/,
      error: 'Invalid tag format.',
    },
  },
};


const JoshTextFieldComponent = (props) => {
  const { placeholder, value, passwordholder } = props;

  const [inputStateValue, updateInputValue] = useState(value);
  
  return (
  <center>
    <form onSubmit={()=>{}}>
    username :<input 
      type='text'
      placeholder={placeholder}
      onChange={ (event) => { updateInputValue(event.target.value)}}
      value={inputStateValue}
    />
    <br/>
    password :<input 
      type='password'
      placeholder={passwordholder}
      onChange={ (event) => { updateInputValue(event.target.value)}}
      value={updateInputValue}
    />
    <br/>
    <input type='submit' value='Login'/>
    </form>
    already user?<a href="JoshTe.js">click here to register</a>
    </center>
  )
};

JoshTextFieldComponent.propTypes = {};

JoshTextFieldComponent.defaultProps = {
  errorMesage: null,
  placeholder: 'Please enter your name',
  passwordholder : 'please enter password',
  value: 'Default value'
};


export default JoshTextFieldComponent;