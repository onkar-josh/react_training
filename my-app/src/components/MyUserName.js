import React ,{useState} from 'react';
import {Input, InputGroup} from 'reactstrap';
import { string, object } from 'yup';

const schema = object().shape({
  UserName: string().required().email()
})


const MyUserName = (props) =>{
  const {placeholder, value} = props;

  const [inputStateValue, updateInputValue] = useState(value);
  const [showError, updateShowError] = useState(false);

  const shouldMarkError = (field) => {
    schema.isValid({
      MyUserName:inputStateValue
    }).then(function(valid) {
      updateShowError(!valid)
    })
  };

  return (
    <div>
    <InputGroup>
      <Input
        type='UserName'
        placeholder={placeholder}
        onChange={(event) =>{updateInputValue(event.target.value)
        shouldMarkError(inputStateValue)
        }}
        value={inputStateValue}
      />
    </InputGroup>
    <br/>
    <span className={showError ? "error" : "d-none"}
      >invalid userName</span>
    </div>
  );
};

//JoshTextFieldComponent.propTypes = {};

MyUserName.defaultProps = {
  errorMesage: null,
  placeholder: 'Please enter your email',
  value: ''
};


export default MyUserName;

