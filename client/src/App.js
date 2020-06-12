import React from 'react';
import './App.css';
import { Switch, Route, withRouter } from 'react-router-dom';
import Main from './container/Main';
import { ERickDashboard } from './components/eRickDriverDashboard';
import { BusDashboard } from './components/BusDriverDashboard';
import { UserDashboard } from './components/userDashboard';

function App() {
  return (
    <div>
      {/* <Switch >
        <Route exact path="/" component={Main} />
        <Route path='/userDashboard' component={UserDashboard} />
        <Route path='/busDashboard' component={BusDashboard} />
        <Route path='/eRickDashboard' component={ERickDashboard} />
      </Switch> */}
      <div className="App">
        <Main />
      </div>
    </div>
  );
}

export default withRouter(App);
