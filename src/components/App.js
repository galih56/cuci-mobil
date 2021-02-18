import React from 'react';
import { HashRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import TransactionDetailPrint from './pages/transactions/DetailPrint';
import GenericNotFound from './pages/errors/GenericNotFound';
import Dashboard from './layout/dashboard/Index';
import Login from './pages/auth/Login';
import './../assets/output.css';
function App() {
  return (
    <Router>
      <Switch>
        <Route path='/login' component={Login} />
        <Route path="/print" component={TransactionDetailPrint} />
        <Route path="/" component={Dashboard} />
        <Route path="/404" component={GenericNotFound} />
        <Redirect to="/404" />
      </Switch>
    </Router>
  );
}

export default App;
