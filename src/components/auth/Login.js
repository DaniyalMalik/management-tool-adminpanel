import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams, useHistory } from 'react-router-dom';
import { makeStyles } from '@mui/styles';
import {
  TextField,
  Button,
  CardActions,
  Card,
  Collapse,
  IconButton,
  Box,
  CardContent,
  Typography,
  Alert,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { loginAdmin } from '../../actions/actionCreators/adminActions';
import Header from '../headers/Header';

const useStyles = makeStyles((theme) => ({
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
  buttonCenter: {
    display: 'flex',
    justifyContent: 'center',
  },
}));

export default function Login() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState('');
  const [severity, setSeverity] = useState('');
  const history = useHistory();
  const [state, setState] = useState({
    email: '',
    password: '',
  });
  const { email, password } = state;

  useEffect(() => {
    const token = localStorage.getItem('bizstruc-adminpanel-token');

    if (token) {
      history.push('/users');
    }
  }, []);

  const handleChange = (e) => {
    setState({ ...state, [e.target.name]: e.target.value });
  };

  const onLogin = async (e) => {
    e.preventDefault();

    if (!password || !email) {
      return alert('Incomplete form!');
    }

    const params = {
      email,
      password,
    };

    const res = await dispatch(loginAdmin(params));

    if (!res.success) {
      // setOpen(true);
      // setSeverity('success');
      // return setMessage(res.message);
      return alert(res.message);
    }

    // setOpen(true);
    // setSeverity('success');
    // setMessage(res.message);
    alert(res.message);
    localStorage.setItem('bizstruc-adminpanel-token', res?.token);
    history.push('/home');
  };

  return (
    <>
      <Header />
      {/* <Collapse in={open}>
        <Alert
          severity={severity}
          action={
            <IconButton
              aria-label='close'
              color='inherit'
              size='small'
              onClick={() => {
                setOpen(false);
              }}>
              <Close fontSize='inherit' />
            </IconButton>
          }
          sx={{ mb: 2 }}>
          {message}
        </Alert>
      </Collapse> */}
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
          {/* <Snackbar open={open} autoHideDuration={6000} onClose={handleClose}>
            <Alert
              onClose={handleClose}
              severity={severity ? 'success' : 'error'}>
              {message}
            </Alert>
          </Snackbar> */}
          <CardContent>
            <Typography
              variant='h4'
              gutterBottom
              style={{ textAlign: 'center' }}>
              Login
            </Typography>
            <form onSubmit={onLogin}>
              <div>
                <TextField
                  id='email'
                  name='email'
                  type='email'
                  size='small'
                  required
                  label='Email'
                  value={email}
                  onChange={handleChange}
                  variant='outlined'
                />
              </div>
              <br />
              <div>
                <TextField
                  id='password'
                  name='password'
                  size='small'
                  label='Password'
                  value={password}
                  required
                  type='password'
                  onChange={handleChange}
                  placeholder='Enter password'
                  variant='outlined'
                />
              </div>
              <br />
              <div className={classes.buttonCenter}>
                <Button
                  type='submit'
                  autoFocus
                  color='primary'
                  variant='contained'
                  size='small'>
                  Login
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
