 
import loginActions from "./ValidationForm";

const initialState = {
    username: "onkar@123",
    password: "",
    token: ""
  };
  
  function MyUserReducer(state = initialState, action) {
  
    switch (action.type) {
      case "email":
        return {  ...state,username: action.value };
      case "password":
        console.log(action.value);
        return { ...state,password : action.value };
        case "token":
        return {  ...state,token: action.value };
      default:
        throw new Error();
    }
  }
  

export default MyUserReducer