import React, { useState } from 'react';

const MyPassword = (props) => {
  const {  value, passwordholder } = props;

  const [inputStateValue, updateInputValue] = useState(value);


  return (
  <center>

    password :<input 
      type='password'
      placeholder={passwordholder}
      onChange={ (event) => { updateInputValue(event.target.value)}}
      value={updateInputValue}
    />
    
    </center>
  )
};

MyPassword.propTypes = {};

MyPassword.defaultProps = {
  errorMesage: null,
  passwordholder : 'please enter password',
  value: 'Default value'
};


export default MyPassword;