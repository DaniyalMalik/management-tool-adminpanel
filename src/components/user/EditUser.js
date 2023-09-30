import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles } from '@mui/styles';
import { useTheme } from '@mui/material/styles';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import {
  TextField,
  AppBar,
  Tabs,
  Tab,
  Typography,
  Box,
  Button,
  CardActions,
  Card,
  CardContent,
  Snackbar,
} from '@mui/material';
import {
  updateUser,
  updateUserPassword,
  getSingleUser,
} from '../../actions/actionCreators/userActions';
import { Alert as MuiAlert } from '@mui/material';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role='tabpanel'
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
      {...other}>
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    // backgroundColor: theme.palette.background.paper,
    width: 500,
  },
  divRoot: {
    '& .MuiTextField-root': {
      // margin: theme.spacing(1),
      width: '25ch',
    },
  },
  cardRoot: {
    minWidth: 275,
    display: 'flex',
    justifyContent: 'center',
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  display: {
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'baseline',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

export default function EditUser() {
  const classes = useStyles();
  const theme = useTheme();
  const history = useHistory();
  const { admin, token } = useSelector((state) => state.admin);
  const { id } = useParams();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('');
  const [value, setValue] = useState(0);
  const [state, setState] = useState({
    email: '',
    password: '',
    repeat_password: '',
    employId: '',
    phoneNumber: '',
    oldPassword: '',
    lastName: '',
    firstName: '',
    companyId: '',
  });
  const {
    firstName,
    lastName,
    companyId,
    oldPassword,
    phoneNumber,
    email,
    password,
    repeat_password,
    employId,
  } = state;

  const getResponse = async (e) => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    const res = await dispatch(getSingleUser(id, token));

    setState({
      ...state,
      firstName: res?.user?.firstName,
      lastName: res?.user?.lastName,
      oldPassword: res?.user?.oldPassword,
      phoneNumber: res?.user?.phoneNumber,
      email: res?.user?.email,
      employId: res?.user?.employId,
      companyId: res?.user?.companyId,
    });
  };

  useEffect(() => {
    getResponse();
  }, []);

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleChangeIndex = (index) => {
    setValue(index);
  };

  const onUserUpdate = async (e) => {
    e.preventDefault();

    const params = {
      email,
      phoneNumber,
      lastName,
      firstName,
    };
    const res = await dispatch(updateUser(id, params, token));

    alert(res?.message);

    // setOpen(true);
    // setSeverity(res.success);
    // setMessage(res.message);

    if (res?.success) {
      history.push('/users');
    }
  };

  const onChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onPasswordUpdate = async (e) => {
    e.preventDefault();

    const params = {
      oldPassword,
      password,
      passwordCheck: repeat_password,
    };
    const res = await dispatch(updateUserPassword(id, params, token));

    alert(res?.message);

    // setOpen(true);
    // setSeverity(res.success);
    // setMessage(res.message);

    if (res?.success) {
      history.push('/users');
    }
  };

  return (
    <>
      <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity={severity ? 'success' : 'error'}>
          {message}
        </Alert>
      </Snackbar>
      <HeaderLoggedIn
        Component={
          <Box className={classes.display}>
            <Box className={classes.root}>
              <AppBar position='static' color='default'>
                <Tabs
                  value={value}
                  onChange={handleChange}
                  indicatorColor='default'
                  textColor='default'
                  variant='fullWidth'
                  color='primary'
                  aria-label='full width tabs example'>
                  <Tab label='Change Info' {...a11yProps(0)} />
                  <Tab label='Change Password' {...a11yProps(1)} />
                </Tabs>
              </AppBar>
              <SwipeableViews
                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                index={value}
                onChangeIndex={handleChangeIndex}>
                <TabPanel value={value} index={0} dir={theme.direction}>
                  <div
                    style={{
                      marginTop: '50px',
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Card
                      style={{
                        minWidth: '500',
                        minHeight: 'auto',
                        padding: '50px',
                      }}>
                      <CardContent>
                        <Typography
                          variant='h4'
                          gutterBottom
                          style={{ textAlign: 'center' }}>
                          Update User Info
                        </Typography>
                        <form className={classes.form} onSubmit={onUserUpdate}>
                          <div>
                            <TextField
                              id='firstName'
                              name='firstName'
                              label='First Name'
                              size='small'
                              required
                              value={firstName}
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          <div>
                            <TextField
                              id='lastName'
                              name='lastName'
                              label='Last Name'
                              size='small'
                              required
                              value={lastName}
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          <div>
                            <TextField
                              id='email'
                              name='email'
                              type='email'
                              label='Email'
                              size='small'
                              required
                              value={email}
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          <div>
                            <TextField
                              id='phoneNumber'
                              name='phoneNumber'
                              label='Phone Number'
                              size='small'
                              required
                              value={phoneNumber}
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          {employId && (
                            <div>
                              <TextField
                                id='employId'
                                name='employId'
                                label='Employ Id'
                                size='small'
                                disabled
                                value={employId}
                                onChange={onChange}
                                variant='outlined'
                              />
                            </div>
                          )}
                          <br />
                          {companyId && (
                            <div>
                              <TextField
                                id='companyId'
                                name='companyId'
                                disabled
                                label='Company Id'
                                size='small'
                                value={companyId}
                                onChange={onChange}
                                variant='outlined'
                              />
                            </div>
                          )}
                          <br />
                          <Button
                            variant='contained'
                            type='submit'
                            color='primary'
                            size='small'>
                            Update User Info
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </TabPanel>
                <TabPanel value={value} index={1} dir={theme.direction}>
                  <div
                    style={{
                      marginTop: '50px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}>
                    <Card
                      style={{
                        minWidth: '500',
                        minHeight: 'auto',
                        padding: '50px',
                      }}>
                      <CardContent>
                        <Typography
                          variant='h4'
                          gutterBottom
                          style={{ textAlign: 'center' }}>
                          Update User Password
                        </Typography>
                        <form
                          className={classes.form}
                          onSubmit={onPasswordUpdate}>
                          <div>
                            <TextField
                              id='oldPassword'
                              required
                              name='oldPassword'
                              label='Old Password'
                              value={oldPassword}
                              size='small'
                              type='password'
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          <div>
                            <TextField
                              id='password'
                              required
                              name='password'
                              label='Password'
                              value={password}
                              size='small'
                              type='password'
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          <div>
                            <TextField
                              id='repeat_password'
                              name='repeat_password'
                              required
                              label='Repeat Password'
                              size='small'
                              value={repeat_password}
                              type='password'
                              onChange={onChange}
                              variant='outlined'
                            />
                          </div>
                          <br />
                          <Button
                            variant='contained'
                            type='submit'
                            color='primary'
                            size='small'>
                            Update User Password
                          </Button>
                        </form>
                      </CardContent>
                    </Card>
                  </div>
                </TabPanel>
              </SwipeableViews>
            </Box>
            <Box>
              <Button
                variant='contained'
                color='primary'
                size='small'
                onClick={() => history.goBack()}>
                Back
              </Button>
            </Box>
          </Box>
        }
      />
    </>
  );
}
