import React from 'react'
import { Route, Link } from 'react-router-dom'
import { useReducer, useEffect , useState} from 'react';
import * as yup from 'yup';
import { Form , Spinner , ListGroup, ListGroupItem} from "reactstrap";
import { Button } from 'reactstrap';
import RegisterContainer from './RegisterContainer';
import MyUserReducer from './MyUserReducer';
import UseToken from '../hooks/UseToken';

import UpdateContainer from './UpdateContainer';

function myUserReducer(state1, action) {
  
    switch (action.type) {
      case "email":
        return {  ...state1,username: action.value };
      case "password":
        console.log(action.value);
        return { ...state1,password : action.value };
      default:
        throw new Error();
    }
  }
  
  const initialState = {
    username: "onkar@123",
    password: ""
  };
  
const UpdateUser = (props) => {    

  const [state1, dispatch] = useReducer(myUserReducer, initialState);  
  const [token, setToken] = useState();
  const [isLoading, setIsLoading] = useState();
  const [passwordErr, setpasswordErr] = useState();
  const [fetchState, setUpdatedFetch] = useState();
  const [err, setErr] = useState();
  const [updateResp, setupdateResp] = useState();
  

  const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
  });

  const schema2 = yup.object().shape({
    password: yup
              .string()
              .required(),
  })

  const shoulPasswordMarkError = () =>{
    console.log(props.token);
    console.log("in password field"+UseToken);
    schema2.isValid({
      password: state1.password
    }).then(function(valid) {
      console.log(valid);
      
      setpasswordErr(!valid);
      console.log("in set password valid"+ passwordErr);
    })
    
  }

  const checkValidation = (event) =>{
    event.preventDefault()
    console.log("in update"+UseToken)
    setIsLoading(true)
    setUpdatedFetch(1)
    let formData= new FormData(event.target)
    console.log(formData.get("username"));
    console.log(state1);
  schema
  .isValid({
    username: formData.get("username"),
    password: formData.get("password"),
  })
  .then(function(valid) {
    
     if(!valid)
     {
      alert("bad credentials");
     }// => true
  });

    const fetchUpdateOptions = {
      method: "PUT",
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${props.token}`
      }),
      body: JSON.stringify({
        email : state1.username, 
        name : "onkar",
        mobile_no : "9999999999"
      }) 
    };
    
    try{
      UpdateContainer(props.uname,fetchUpdateOptions).then(response => {
        if(response)
        {
        setupdateResp(response);
        setIsLoading(false);

      }
      else
      {
        setErr(response.message);
        console.log(err);
        setIsLoading(false)
      }
      });
 
        
  } catch (err)
  {
    setErr(err);
    setIsLoading(false);
  }
  };



  return (
<center>
    <Form onSubmit={checkValidation}>
  
         <Spinner type="grow" color="primary" />
            <input
              placeholder="Enter Email"
              name="username"
              value={state1.email}
              type="email"
              onChange={ (event) => { dispatch({type: "email",value: event.target.value})}
                  
            }
            />
            <Spinner type="grow" color="primary" />
            <br/>
            <Spinner type="grow" color="success" />
            <input
              placeholder="Enter password"
              name="password"
              value={state1.password}
              type="password"
              onChange={ (event) => { dispatch({type: "password", value: event.target.value})
              shoulPasswordMarkError()
            }}
            />
            <span className={passwordErr ? "error" : "d-none"}
            >invalid password</span>


            <Spinner type="grow" color="success" />
            <br/>
            <Button color="danger" type="submit" >Update</Button>
        </Form>
        
    </center>
  
  )
};

export default UpdateUser;