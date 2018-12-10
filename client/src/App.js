import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import jwt_decode from 'jwt-decode';
import { Provider } from 'react-redux';

import store from './store';

import PrivateRoute from './components/common/PrivateRoute';
import setAuthToken from './utils/setAuthToken';
import { setCurrentUser, logoutUser } from './actions/authActions';
import { clearCurrentProfile } from './actions/profileActions';

import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import Dashboard from './components/dashboard/Dashboard';
import CreateProfile from './components/create-profile/CreateProfile';
import EditProfile from './components/edit-profile/EditProfile';
import AddExperience from './components/add-credentials/AddExperience';
import AddEducation from './components/add-credentials/AddEducation';
import Profiles from './components/profiles/Profiles';
import Profile from './components/profile/Profile';
import NotFound from './components/not-found/NotFound';
import Footer from './components/layout/Footer';

import './App.css';

// Check for authorization
if (localStorage.jwtToken) {
  setAuthToken(localStorage.jwtToken);
  const decoded = jwt_decode(localStorage.jwtToken);
  store.dispatch(setCurrentUser(decoded));

  const currentTime = Date.now() / 1000;
  if (decoded.exp < currentTime) {
    store.dispatch(logoutUser());
    store.dispatch(clearCurrentProfile());
    window.location.href = '/login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div className='App'>
            <Navbar />
            <Route exact path='/' component={Landing} />
            <div className='container above-footer'>
              <Route exact path='/register' component={Register} />
              <Route exact path='/login' component={Login} />
              <Switch>
                <PrivateRoute exact path='/dashboard' component={Dashboard} />
                <PrivateRoute
                  exact
                  path='/create-profile'
                  component={CreateProfile}
                />
                <PrivateRoute
                  exact
                  path='/edit-profile'
                  component={EditProfile}
                />
                <PrivateRoute
                  exact
                  path='/add-experience'
                  component={AddExperience}
                />
                <PrivateRoute
                  exact
                  path='/add-education'
                  component={AddEducation}
                />
              </Switch>
              <Route exact path='/profiles' component={Profiles} />
              <Route exact path='/profile/:handle' component={Profile} />
              <Route exact path='/not-found' component={NotFound} />
            </div>
            <Footer />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
