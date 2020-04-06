import React ,{useState} from 'react';
import {Input, InputGroup} from 'reactstrap';
import { string, object } from 'yup';
import MyPassword from './Mypassword';

const schema = object().shape({
  password: string().required()
})


const LoginName = (props) =>{
  const {placeholder, value} = props;

  const [inputStateValue, updateInputValue] = useState(value);
  const [showError, updateShowError] = useState(false);

  const shouldMarkError = (field) => {
    schema.isValid({
      password:inputStateValue
    }).then(function(valid) {
      updateShowError(!valid)
    })
  };

  return (
    <div>
    <InputGroup>
      <Input
        type='password'
        placeholder={placeholder}
        onChange={(event) =>{updateInputValue(event.target.value)
        shouldMarkError(inputStateValue)
        }}
        value={inputStateValue}
      />
    </InputGroup>
    <br/>
    <span className={showError ? "error" : "d-none"}
      >invalid password</span>
    </div>
  );
};

//JoshTextFieldComponent.propTypes = {};

LoginName.defaultProps = {
  errorMesage: null,
  placeholder: 'Please enter your password',
  value: ''
};


export default MyPassword;

