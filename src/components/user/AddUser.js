import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  CardActions,
  Typography,
  Card,
  CardContent,
  Snackbar,
  MenuItem,
  Box,
} from '@mui/material';
import { registerUser } from '../../actions/actionCreators/userActions';
import { getCompanies } from '../../actions/actionCreators/companyActions';
import { Alert as MuiAlert } from '@mui/material';
import HeaderLoggedIn from '../headers/HeaderLoggedIn';

function Alert(props) {
  return <MuiAlert elevation={6} variant='filled' {...props} />;
}

const useStyles = makeStyles((theme) => ({
  root: {
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
}));

export default function AddUser() {
  const classes = useStyles();
  const { admin, token } = useSelector((state) => state.admin);
  const { companies } = useSelector((state) => state.companies);
  const dispatch = useDispatch();
  const history = useHistory();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState(false);
  const [severity, setSeverity] = useState('');
  const [state, setState] = useState({
    email: '',
    password: '',
    repeat_password: '',
    employId: '',
    phoneNumber: '',
    lastName: '',
    firstName: '',
  });
  const {
    firstName,
    lastName,
    phoneNumber,
    email,
    password,
    repeat_password,
    employId,
  } = state;

  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }

    setOpen(false);
  };

  const getResponse_1 = async (e) => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }
  };

  useEffect(() => {
    getResponse_1();
  }, []);

  const getResponse_2 = async () => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (!token) {
      return history.push('/login');
    }

    dispatch(getCompanies(token));
  };

  useEffect(() => {
    getResponse_2();
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onUserAdd = async (e) => {
    e.preventDefault();

    try {
      const params = {
        email,
        password,
        passwordCheck: repeat_password,
        employId,
        lastName,
        firstName,
      };
      const res = await dispatch(registerUser(params));

      // setOpen(true);
      // setSeverity(res?.success);
      // setMessage(res?.message);

      alert(res?.message);

      if (res?.success) {
        history.push('/users');
      }
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <>
      <HeaderLoggedIn
        Component={
          <div
            style={{
              marginTop: '50px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={severity ? 'success' : 'error'}>
                {message}
              </Alert>
            </Snackbar>
            <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
              <Alert
                onClose={handleClose}
                severity={severity ? 'success' : 'error'}>
                {message}
              </Alert>
            </Snackbar>
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
                  Add User
                </Typography>
                <form onSubmit={onUserAdd}>
                  <div>
                    <TextField
                      id='firstName'
                      name='firstName'
                      label='First Name'
                      size='small'
                      required
                      value={firstName}
                      onChange={handleChange}
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
                      onChange={handleChange}
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
                      onChange={handleChange}
                      variant='outlined'
                    />
                  </div>
                  <br />
                  <div>
                    <TextField
                      select
                      id='employId'
                      variant='outlined'
                      name='employId'
                      label='Employ'
                      size='small'
                      fullWidth
                      value={employId}
                      onChange={handleChange}
                      helperText='Please select a company'>
                      {companies.map((company, key) => (
                        <MenuItem key={key} value={company._id}>
                          {company.name}
                        </MenuItem>
                      ))}
                    </TextField>
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
                      onChange={handleChange}
                      placeholder='Enter password'
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
                      onChange={handleChange}
                      placeholder='Re-enter password'
                      variant='outlined'
                    />
                  </div>
                  <br />
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'space-around',
                    }}>
                    <Button variant='contained' type='submit' size='small'>
                      Add User
                    </Button>
                    <Button
                      size='small'
                      variant='contained'
                      color='primary'
                      onClick={() => history.goBack()}>
                      Back
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        }
      />
    </>
  );
}
