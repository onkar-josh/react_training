import React from 'react'
import { Route, Link } from 'react-router-dom'
import { useReducer, useEffect , useState} from 'react';
import * as yup from 'yup';
import { Form , Spinner , ListGroup, ListGroupItem} from "reactstrap";
import { Button } from 'reactstrap';
import RegisterContainer from './RegisterContainer';



function myUserReducer(state, action) {
  
    switch (action.type) {
      case "email":
        
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
  
const Users = () => {    

    const [state, dispatch] = useReducer(myUserReducer, initialState);
  
  const [innerStatus, setInnerStatus]=useState();

  const [isLoading, setIsLoading] = useState();
  const [passwordErr, setpasswordErr] = useState();
  const [fetchState, setUpdatedFetch] = useState();
 
  

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

    console.log("in password field");
    schema2.isValid({
      password: state.password
    }).then(function(valid) {
      console.log(valid);
      
      setpasswordErr(!valid);
      console.log("in set password valid"+ passwordErr);
    })
    
  }

  const checkValidation = (event) =>{
    event.preventDefault()
    setIsLoading(true)
    setUpdatedFetch(1)
    let formData= new FormData(event.target)
    console.log(formData.get("username"));
    console.log(state);
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


  const fetchOptions = {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      email : state.username,
      password : state.password,
      "name" : "onkar",
	"mobile_no" : "9975756471",
    }) 
  };

  RegisterContainer(fetchOptions).then(response => {
    console.log(response);
    setInnerStatus(true)
});

  };


  if(innerStatus)
  {
    return (
    <h1>User Created Successfully</h1>
    );
  }


  return (
<center>
    <Form onSubmit={checkValidation}>
         <Spinner type="grow" color="primary" />
            <input
              placeholder="Enter Email"
              name="username"
              value={state.email}
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
              value={state.password}
              type="password"
              onChange={ (event) => { dispatch({type: "password", value: event.target.value})
              shoulPasswordMarkError()
            }}
            />
            <span className={passwordErr ? "error" : "d-none"}
            >invalid password</span>


            <Spinner type="grow" color="success" />
            <br/>
            <Button color="danger" type="submit" >Login</Button>
        </Form>
        
    </center>
  
  )
};

export default Users;