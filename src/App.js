import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Test from './components/Test';
import { useHistory, useLocation } from 'react-router-dom';
import Login from './components/auth/Login';
import NotFound from './components/NotFound';
// import Register from './components/Register';
import { useDispatch, useSelector } from 'react-redux';
import AddCompany from './components/company/AddCompany';
import EditCompany from './components/company/EditCompany';
import ViewCompany from './components/company/ViewCompany';
import Users from './components/user/Users';
import EditUser from './components/user/EditUser';
import ViewUser from './components/user/ViewUser';
import AddUser from './components/user/AddUser';
import { fetchAdminInfo } from './actions/actionCreators/adminActions';
import Companies from './components/company/Companies';
import Dashboard from './components/dashboard/Dashboard';
import { createTheme, ThemeProvider, withStyles } from '@mui/material/styles';
// import Profile from './components/Profile';

function History() {
  const location = useLocation();
  const history = useHistory();
  const dispatch = useDispatch();

  useEffect(() => {
    if (location.pathname === '/') {
      history.push('/login');
    }
  }, []);

  useEffect(() => {
    let token = localStorage.getItem('bizstruc-adminpanel-token');

    // if (
    //   !token &&
    //   location.pathname !== '/login' &&
    //   location.pathname !== '/test_1' &&
    //   location.pathname !== '/test_2' &&
    //   location.pathname !== '/register' &&
    //   location.pathname !== '/register/' &&
    //   location.pathname !== '/forgotpassword' &&
    //   location.pathname.split('/')[1] !== 'resetpassword'
    // )

    
    if (token) {
      dispatch(fetchAdminInfo(token));

      history.push('/home');
    } else {
      localStorage.removeItem('bizstruc-adminpanel-token');

      history.push('/login');
    }
  }, []);

  return <div></div>;
}

const App = () => {
  const theme = createTheme({
    palette: {
      primary: {
        light: '#000000',
        main: '#000000',
        dark: '#000000',
      },
      secondary: {
        light: '#ffd95a',
        main: '#f9a825',
        dark: '#c17900',
        contrastText: '#212121',
      },
      background: {
        default: '#ffffff',
      },
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <Router>
        <Switch>
          <Route path='/home' exact component={Dashboard} />
          <Route path='/login' exact component={Login} />
          {/* <Route path='/register' exact component={Register} /> */}
          <Route path='/companies/add' exact component={AddCompany} />
          <Route path='/companies/view/:id' exact component={ViewCompany} />
          <Route path='/companies/edit/:id' exact component={EditCompany} />
          <Route path='/companies' exact component={Companies} />
          {/* <Route path='/profile' exact component={Profile} /> */}
          <Route path='/users' exact component={Users} />
          <Route path='/users/add' exact component={AddUser} />
          <Route path='/users/edit/:id' exact component={EditUser} />
          <Route path='/users/view/:id' exact component={ViewUser} />
          <Route path='/test' exact component={Test} />
          <Route component={NotFound} />
        </Switch>
        <History />
      </Router>
    </ThemeProvider>
  );
};

export default App;
