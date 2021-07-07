import React from 'react';
import './form.css'
import InnerSqaure from './InnerSqaure';
import TopSquare from './TopSquare';
import Users from './Users'
import Contact from './Contact'
//import ParenntHook from './ParentHook';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom";

const OuterSquare = () => {
    return(
        <div className="OuterSquare">
            
        <Router>
  <div>
    <nav>
      <ul>
          <Link to="/Users">new user</Link>
      </ul>
      <ul>
          <Link to="/InnerSqaure">login</Link>
      </ul>
    </nav>

    <Switch>
      <Route path="/Users">
        <Users />
      </Route>
      <Route path="/InnerSqaure">
      <InnerSqaure/>
          </Route>
    </Switch>
  </div>
</Router>
        </div>
    )
};
export default OuterSquare;