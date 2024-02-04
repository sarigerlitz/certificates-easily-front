import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Login from '../components/login';
import NavHeader from '../components/NavHeader';
const AppRouter = () => {
  return (
    <Router>
      <div>
        <Switch>
          <Route component={Login} path="/Login" exact={true}/>
          <Route component={NavHeader} path="/"/>
        </Switch>
      </div>
    </Router>
  );
};

export default AppRouter;