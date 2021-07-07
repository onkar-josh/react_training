
import React, { useReducer, useEffect , useState} from 'react';
import * as yup from 'yup';
import { Form , Spinner , ListGroup, ListGroupItem} from "reactstrap";
import { Button } from 'reactstrap';
import useFetch from '../hooks/useFetch';
import LoginContainer from './LoginContainer';
import ListOfUsers from './ListOfUsers';
import UpdateContainer from './UpdateContainer';
import DeleteContainer from './DeleteContainer';
import Users from './Users'
import Contact from './Contact'
import UpdateUser from './UpdateUser'
//import ParenntHook from './ParentHook';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";


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

const ValidationForm = (props) => {
//console.log("in validation form");
 
  const [state, dispatch] = useReducer(myUserReducer, initialState);
  const [token, setToken] = useState();
  const [err, setErr] = useState();
  const [status, setStatus] = useState();
  const [innerStatus, setInnerStatus]=useState();
  const [data1, setData1]= useState();
  const [isLoading, setIsLoading] = useState();
  const [passwordErr, setpasswordErr] = useState();
  const [fetchState, setUpdatedFetch] = useState();
  const [updateResp, setupdateResp] = useState();
  const [deleteResp, setDeleteResp] = useState();
  const [newToken, setNewToken] = useState();
  

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
      password : state.password
    }) 
  };

  LoginContainer(fetchOptions).then(response => {
    if(response.token)
    {
    console.log(response.token);
    setNewToken(response.token);
    setToken(response.token);
    setIsLoading(false);
  }
  else
  {
    setErr(response.message);
    console.log(err);
    setIsLoading(false)
  }
  });

};



useEffect(() => {

});
if(isLoading)
{
  return(
  <Spinner animation="border" role="status">
  <span className="sr-only">Loading...</span>
</Spinner>
  )
}

if(err)
{
  return(
    <h1>{err}</h1>
    )
}

else if(token)
  {
    const seeAllUsers = (event) =>{
      event.preventDefault();
      setIsLoading(true);
      const fetchAlllUsers = {
       method: "GET",
      headers: new Headers({
        "Content-Type": "application/json",
        'Authorization': `Bearer ${token}`
      })
      };
      try{

        ListOfUsers(fetchAlllUsers).then(response => {
          if(response)
          {
          setData1(response);
          setIsLoading(false);
          setInnerStatus(true);
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
    }


    const updateUser = (event) =>{
      event.preventDefault();
      setIsLoading(true);
      const fetchUpdateOptions = {
        method: "PUT",
        headers: new Headers({
          "Content-Type": "application/json",
          'Authorization': `Bearer ${token}`
        }),
        body: JSON.stringify({
          email : "onkarhasabe49@gmail.com", 
          name : "onkar",
          mobile_no : "9999999999"
        }) 
      };
      
      try{
        UpdateContainer(state.username,fetchUpdateOptions).then(response => {
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
    
    }

    const deleteUser = (event) =>{
      event.preventDefault();
      setIsLoading(true);
      const fetchDeleteUser = {
        method: "DELETE",
       headers: new Headers({
         "Content-Type": "application/json",
         'Authorization': `Bearer ${token}`
       })
       };
       try{
        DeleteContainer("onkarhasabe49@gmail.com",fetchDeleteUser).then(response => {
          
            setDeleteResp (true);
            console.log(response.status);
            setIsLoading(false);
         } );
     
    } catch (err)
    {
      setErr(err);
      setIsLoading(false);
    }
    
    }




    if(isLoading)
    {
      return(
      <Spinner animation="border" role="status">
      <span className="sr-only">Loading...</span>
    </Spinner>
      )
    }

     else if(err)
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

    if(updateResp)
    {
      return(
      <h1>User Updated Successfully</h1>
      )
    }

    if(deleteResp)
    {
      return(
      <h1>User Deleted Successfully</h1>
      )
    }

return(
<>

<div>
<h1>you are authorized user</h1>
<br/>
with  token<br/>
{token}
<br/>
<Button color="info" onClick={seeAllUsers}>List of all users</Button> <br/>
<Button color="primary" onClick={updateUser}>Update User</Button> <br/>
<Button color="danger" onClick={deleteUser}>Delete User</Button>  <br/>
<Router>
  <div>
    <nav>
      <ul>
          <Link to="/UpdateUser">Update User</Link>
      </ul>
    </nav>

    <Switch>
      <Route path="/UpdateUser" >
      <UpdateUser token={token} uname={state.username}/>
          </Route>
    </Switch>
  </div>
</Router>
</div>
</>
      
  )
  }
  /*<div>
        <h1>you are authorized user</h1>
        <br/>
        with  token<br/>
        {token}
        <br/>
        <Button color="info" onClick={seeAllUsers}>List of all users</Button> <br/>
        <Button color="primary" onClick={updateUser}>Update User</Button> <br/>
        <Button color="danger" onClick={deleteUser}>Delete User</Button>  <br/>
      </div>*/
  
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





ValidationForm.defaultProps = {
  token: null,
  status: 0,
  innerstatus:0,
  data1:null,
  err: null,
  isLoading:false,
  passwordErr: false,
  fetchState: 0
 
};
export default ValidationForm;
