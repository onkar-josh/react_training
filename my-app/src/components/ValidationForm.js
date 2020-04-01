
import React, { useReducer } from 'react';
import * as yup from 'yup';
import { Form , Spinner} from "reactstrap";
import { Button } from 'reactstrap';



function myUserReducer(state, action) {
  
  switch (action.type) {
    case "email":
      console.log(action.value);
      return {  ...state,username: action.value };
    case "password":
      console.log(action.value);
      return { ...state,password : action.value };
    default:
      throw new Error();
  }
}

const initialState = {
  username: "onkar@123",
  password: ""
};

const ValidationForm = (props) => {
  
  const [state, dispatch] = useReducer(myUserReducer, initialState);

  const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
  });
  const checkValidation = (event) =>{
    event.preventDefault()
    let formData= new FormData(event.target)
    console.log(formData.get("username"));
    console.log(state);
  schema
  .isValid({
    username: formData.get("username"),
    password: formData.get("password"),
  })
  .then(function(valid) {
    console.log(valid);
     if(!valid)
     {
      alert("bad credentials");
     }// => true
  });
};

  return (
  <center>
    <Form onSubmit={checkValidation}>
         <Spinner type="grow" color="primary" />
            <input
              placeholder="Enter Email"
              name="username"
              value={state.email}
              type="email"
              onChange={ (event) => { dispatch({type: "email",value: event.target.value})}}
              
            />
            <Spinner type="grow" color="primary" />
            <br/>
            <Spinner type="grow" color="success" />
            <input
              placeholder="Enter password"
              name="password"
              value={state.password}
              type="password"
              onChange={ (event) => { dispatch({type: "password", value: event.target.value})}}
            />
            <Spinner type="grow" color="success" />
            <br/>
            <Button color="danger" type="submit" >Login</Button>
        </Form>
    already user?<a href="JoshTe.js">click here to register</a>
    </center>
  )
};

export default ValidationForm;
