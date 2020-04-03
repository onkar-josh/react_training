
import React, { useReducer, useEffect , useState} from 'react';
import * as yup from 'yup';
import { Form , Spinner , ListGroup, ListGroupItem} from "reactstrap";
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
console.log("hii");
 
  const [state, dispatch] = useReducer(myUserReducer, initialState);
  const [token, setToken] = useState();
  const [err, setErr] = useState();
  const [status, setStatus] = useState();
  const [innerStatus, setInnerStatus]=useState();
  const [data1, setData]= useState();
  const [isLoading, setIsLoading] = useState();
  
  const schema = yup.object().shape({
    username: yup.string().email().required(),
    password: yup.string().required(),
  });
  const checkValidation = (event) =>{
    event.preventDefault()
    setIsLoading(true)
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

  try{
    fetch("http://3.12.196.3:5000/login", {
    method: "POST",
    headers: new Headers({
      "Content-Type": "application/json"
    }),
    body: JSON.stringify({
      email : formData.get("username"),
      password : formData.get("password") 
    })

  }).then(resp => {
    setStatus(resp.status);
    console.log(status);
    return resp.json();
  })
  .then(data => {
         if(data.token)
         {
         setToken(data.token);
         console.log(token);
         }
         else
         {
           console.log(setErr);
           console.log(data.message);
           setErr(data.message);
           console.log(err);
           setIsLoading(false)
         }
  }
  )} catch (err)
  {
    setErr(err);
    setIsLoading(false)
  }
};
useEffect(() => {
  console.log("in use-effect function")
  //setIsLoading(false)
});

if(err)
{
  return(
    <h1>{err}</h1>
    )
}

else if(status)
  {
    const checkValidation1 = (event) =>{
      event.preventDefault();
      try{
    fetch("http://3.12.196.3:5000/users", {
      method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      }),
    }).then(resp => {
      setInnerStatus(200)
      return resp.json();
    })
    .then(data => {
      setData(data)
      console.log(data) 
           }
          
    )} catch (err)
    {
      setErr(err);
    }
    }
          if(err)
          {
            return(
              <h1>{err}</h1>
              )
          }

    if(innerStatus)
    {
       
      return(
        <ListGroup>
      <div>{data1 && data1.map((item, index) => {
        return <ListGroupItem key={index}>
     name :{item.name}<br/>
     email :{item.email}
     </ListGroupItem>;
       })} </div>
       </ListGroup>
      )
    }

return(
      <div>
        {token}
      <Form onSubmit={checkValidation1}>
        <Button color="danger" type="submit" >Login</Button>
      </Form>
      </div>
  )
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


ValidationForm.defaultProps = {
  token: null,
  status: 0,
  innerstatus:0,
  data1:null,
  err: null,
  isLoading:false,
 
};
export default ValidationForm;

